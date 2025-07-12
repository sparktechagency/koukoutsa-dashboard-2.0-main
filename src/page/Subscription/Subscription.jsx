import React, { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { AiFillCrown } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useCreateSubScriptionMutation, useDeleteSubScriptionMutation, useGetSubScriptionQuery, useUpdateScriptionMutation } from '../../redux/features/subscription/subscription';

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [monthlyType, setMonthlyType] = useState('1'); // Monthly/Yearly still retained
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('month'); // month or year
    const [id, setId] = useState('');
    const [features, setFeatures] = useState([]);

    const { data } = useGetSubScriptionQuery();
    const allData = data?.data?.attributes;

    // Handle open modal for adding or editing
    const showModal = (edit = false, subscription = {}) => {
        setIsEditing(edit);
        setIsModalVisible(true);
        if (edit) {
            setSubscriptionName(subscription.title);
            setPrice(subscription.price);
            setDuration(subscription.duration); // month or year
            setFeatures(subscription.features || []); // Set features for edit
            setId(subscription._id); // Pre-fill for editing
        } else {
            setSubscriptionName('');
            setPrice('');
            setDuration('month'); // Default to month
            setFeatures([]); // Reset features on new subscription
            setId(null);
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setPrice('');
        setDuration('month');
        setFeatures([]);
    };


    const [createSubScription] = useCreateSubScriptionMutation();
    // Handle form submit for adding/editing subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subscriptionName || !price || !duration || features.length === 0) {
            message.error('Please fill all fields!');
            return;
        }

        const formData = {
            title: subscriptionName,
            price,
            duration,
            features,
        };

        try {

            const response = await createSubScription(formData).unwrap();
            if (response) {
                message.success('Subscription added successfully!');
                handleCancel();
            }

        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const [updateScription] = useUpdateScriptionMutation();

    const handleUpdate = async (e) => {

        e.preventDefault();
        const formData = {
            title: subscriptionName,
            price,
            duration,
            features,

        };
        console.log(id, formData);

        try {
            const response = await updateScription({ formData, id }).unwrap();

            if (response) {
                message.success('Subscription updated successfully!');
                handleCancel();
            }

        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const [deleteSubscription, { isLoading }] = useDeleteSubScriptionMutation();
    const handleDelete = async (subscription) => {
        try {
            const response = await deleteSubscription(subscription._id).unwrap();
            if (response) {
                message.success('Subscription deleted successfully!');
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    // Add feature input field dynamically
    const addFeature = () => {
        setFeatures([...features, '']); // Add empty feature input
    };

    const removeFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures); // Remove specific feature
    };

    const handleFeatureChange = (value, index) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value; // Update specific feature
        setFeatures(updatedFeatures);
    };

    return (
        <section>
            <div className="w-full md:flex justify-end items-center gap-2 flex-wrap py-6">
                <button
                    type="button"
                    className="text-xl px-2 md:px-5 py-3 bg-[#ffd400] text-white flex justify-center items-center gap-1 rounded md:mb-0"
                    onClick={() => showModal(false)}
                >
                    <FaPlus className="text-xl font-semibold text-white" /> Add Subscription
                </button>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {allData?.map((subscription) => (
                    <div key={subscription.id} className="border-2 border-[#ffd400] rounded-lg overflow-hidden">
                        <div className='p-5'>
                            <h2 className="capitalize text-3xl font-semibold text-[#ffd400] flex items-center gap-2">
                                <div className='h-10 w-10 rounded-full bg-[#ffd400] text-white flex justify-center items-center'>
                                    <AiFillCrown className="size-6" />
                                </div>
                                {subscription?.title}
                            </h2>
                            <h3 className='text-2xl font-semibold mt-5'>Unit Type</h3>
                            {subscription?.features?.map((feature, index) => (
                                <p key={index} className="mt-2 font-semibold text-xl gap-2 flex items-center">
                                    <FaRegCircleCheck className='text-[#ffd400]' /> {feature}
                                </p>
                            ))}
                        </div>
                        <div className='border-t-2 border-b-2 border-[#ffd400] py-2 text-center my-3'>
                            <p className="text-5xl font-semibold text-[#ffd400] gap-2">
                                {subscription.price} <span className='text-base font-semibold text-black'>/ {subscription.duration}</span>
                            </p>
                        </div>
                        <div className="gap-3 p-5">
                            <button
                                onClick={() => handleDelete(subscription)}
                                className="w-full py-3 mb-2 px-6 border border-[#ffd400] text-[#ffd400] rounded-lg"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => showModal(true, subscription)}
                                className="w-full py-3 px-6 border bg-[#ffd400] text-white rounded-lg"
                            >
                                Edit Package
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding/editing subscription */}
            <Modal
                title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Remove default cancel and ok buttons
            >
                <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Name</span>
                        <Input
                            className="w-full py-3"
                            placeholder="Enter subscription name"
                            value={subscriptionName}
                            onChange={(e) => setSubscriptionName(e.target.value)}
                        />
                    </div>

                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Features</span>
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <Input
                                    placeholder={`Feature ${index + 1}`}
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(e.target.value, index)}
                                />
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => removeFeature(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button className='' type="link" onClick={addFeature}> + Add Feature</Button>
                    </div>

                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Duration</span>
                        <Select
                            className="w-full h-12"
                            value={duration}
                            onChange={(value) => setDuration(value)}
                        >
                            <Select.Option value="month">Month</Select.Option>
                            <Select.Option value="year">Year</Select.Option>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Price</span>
                        <Input
                            className="w-full py-3"
                            placeholder="Enter price"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <Button type="primary" htmlType="submit" className="w-full py-3 px-5 rounded-lg bg-[#ffd400] text-white">
                        {isEditing ? 'Update Subscription' : 'Add Subscription'}
                    </Button>
                </form>
            </Modal>
        </section>
    );
};

export default Subscription;
