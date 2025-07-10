import React, { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { AiFillCrown } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [unitType, setUnitType] = useState('1-3 Units');
    const [monthlyType, setMonthlyType] = useState('1');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');

    // Demo data for subscriptions
    const subscriptions = [
        {
            id: 1,
            name: 'Solo',
            unitType: '1-3 Units',
            type: 'Monthly',
            price: '$9.00',
        },
        {
            id: 2,
            name: 'Family Plan',
            unitType: '4-6 Units',
            type: 'yearly',
            price: '$20.00',
        },
        {
            id: 3,
            name: 'Other Plan',
            unitType: '4-8 Units',
            type: 'yearly',
            price: '$50.00',
        },
    ];

    // Handle open modal for adding or editing
    const showModal = (edit = false, subscription = {}) => {
        setIsEditing(edit);
        setIsModalVisible(true);
        if (edit) {
            setSubscriptionName(subscription.name);
            setUnitType(subscription.unitType);
            setMonthlyType(subscription.monthlyType);
            setPrice(subscription.price);
            setId(subscription.id); // Pre-fill for editing
        } else {
            setSubscriptionName('');
            setUnitType('1-3 Units');
            setMonthlyType('1');
            setPrice('');
            setId(null);
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setUnitType('1-3 Units');
        setMonthlyType('1');
        setPrice('');
    };

    // Handle form submit for adding/editing subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subscriptionName || !unitType || !monthlyType || !price) {
            message.error('Please fill all fields!');
            return;
        }

        const formData = {
            name: subscriptionName,
            unitType,
            monthlyType,
            price,
        };

        // Simulating the create subscription
        try {
            console.log('New subscription created:', formData);
            message.success('Subscription added successfully!');
            handleCancel();
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = {
            name: subscriptionName,
            unitType,
            monthlyType,
            price,
            id,
        };

        // Simulating the update subscription
        try {
            console.log('Updated subscription:', formData);
            message.success('Subscription updated successfully!');
            handleCancel();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (subscription) => {
        try {
            // Simulating the delete subscription
            console.log('Deleted subscription ID:', subscription.id);
            message.success('Subscription deleted successfully!');
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    return (
        <section>
            <div className="w-full md:flex justify-end items-center gap-2 flex-wrap py-6">
                {/* <Link
                    to="/subscription/user-list"
                    className="text-xl px-2 md:px-5 py-3 border border-[#ffd400] text-[#ffd400] flex justify-center items-center gap-1 rounded md:mb-0"
                >
                    Subscriptions User
                </Link> */}
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
                {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border-2 border-[#ffd400]  rounded-lg overflow-hidden">
                        <div className='p-5'>
                            <h2 className=" text-3xl font-semibold text-[#ffd400] flex items-center gap-2
                            ">
                                <div className='h-10 w-10 rounded-full bg-[#ffd400] text-white flex justify-center items-center'>
                                    <AiFillCrown className="size-6" />
                                </div>
                                {subscription.name}
                            </h2>
                            <h3 className='text-2xl font-semibold mt-5'>Unite type</h3>
                            <p className=" mt-2 font-semibold text-xl gap-2   flex items-center"><FaRegCircleCheck className='text-[#ffd400]' /> {subscription.unitType}</p>
                        </div>
                        <div className='border-t-2 border-b-2 border-[#ffd400] py-2 text-center my-3'>
                            <p className=" text-5xl font-semibold text-[#ffd400] gap-2  ">  {subscription.price} <span className='text-base font-semibold text-black '>/ {subscription.type}</span></p>
                        </div>
                        <div className=" gap-3 p-5 ">
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
                <form onSubmit={isEditing ? handleUpdate : handleSubmit} action="">
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
                        <span className="block mb-2 font-semibold">Unit Type</span>
                        <Select
                            className="w-full h-12"
                            value={unitType}
                            onChange={(value) => setUnitType(value)}
                        >
                            <Select.Option value="1-3 Units">1 - 3 Units</Select.Option>
                            <Select.Option value="4-6 Units">4 - 6 Units</Select.Option>
                            <Select.Option value="7+ Units">7+ Units</Select.Option>
                        </Select>
                    </div>

                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Monthly Type</span>
                        <Select
                            className="w-full h-12"
                            value={monthlyType}
                            onChange={(value) => setMonthlyType(value)}
                        >
                            <Select.Option value="1">Weekly</Select.Option>
                            <Select.Option value="2">Monthly</Select.Option>
                            <Select.Option value="3">Yearly</Select.Option>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Price</span>
                        <Input
                            className='w-full py-3'
                            placeholder="Enter price"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>


                    <button type="primary" htmlType="submit" className="w-full py-3 px-5 rounded-lg bg-[#ffd400] text-white">
                        {isEditing ? 'Update Subscription' : 'Add Subscription'}
                    </button>
                </form>
            </Modal>
        </section>
    );
};

export default Subscription;
