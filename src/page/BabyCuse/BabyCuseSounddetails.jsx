

import React, { useState } from 'react';
import { Modal, Input, Button, message, Space, Form, Upload } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { IoCloudUploadOutline, IoSearch } from 'react-icons/io5';
import { FaCirclePlay } from 'react-icons/fa6';

const BabyCuseSounddetails = () => {
    const [babyCues, setBabyCues] = useState([
        {
            id: 1,
            title: 'Cat sound',
            description:
                '00.59',
            image: null, // Add image field
        },
        {
            id: 2,
            title: 'Cat sound',
            description:
                '00.42',
            image: null, // Add image field
        },
        {
            id: 3,
            title: 'Cat sound',
            description:
                '00.59',
            image: null, // Add image field
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCue, setCurrentCue] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // New state for image

    // Open modal for adding a new baby cue
    const handleAddClick = () => {
        setIsEditMode(false);
        setTitle('');
        setDescription('');
        setImage(null); // Clear the image
        setIsModalVisible(true);
    };

    // Open modal for editing a baby cue
    const handleEditClick = (cue) => {
        setIsEditMode(true);
        setCurrentCue(cue);
        setTitle(cue.title);
        setDescription(cue.description);
        setImage(cue.image); // Set the image for edit
        setIsModalVisible(true);
    };

    // Handle delete action
    const handleDeleteClick = (id) => {
        setBabyCues((prevCues) => prevCues.filter((cue) => cue.id !== id));
        message.success('Baby cue deleted successfully!');
    };

    // Handle modal submit (add or edit)
    const handleModalSubmit = () => {
        if (!title || !description) {
            message.error('Please provide both title and description.');
            return;
        }

        if (isEditMode) {
            setBabyCues((prevCues) =>
                prevCues.map((cue) =>
                    cue.id === currentCue.id
                        ? { ...cue, title, description, image }
                        : cue
                )
            );
            message.success('Baby cue updated successfully!');
        } else {
            const newCue = {
                id: Date.now(),
                title,
                description,
                image,
            };
            setBabyCues((prevCues) => [...prevCues, newCue]);
            message.success('Baby cue added successfully!');
        }

        setIsModalVisible(false);
    };

    // Modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle image upload (Dragger component)
    const handleImageChange = ({ fileList }) => {
        setImage(fileList[0]); // Set the image after file upload
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    className="text-2xl font-bold text-[#344f47] hover:text-[#344f47] flex items-center gap-2"
                    to="/baby-cuse"
                >
                    <FaArrowLeft />
                    <h1>Baby Cues</h1>
                </Link>
                <div className='flex items-center gap-4'>
                    {/* search input field raw input field  */}
                    <div className='relative'>
                        <input type="text" placeholder="Search..." className='border border-[#344f47] px-4 py-2 rounded-full ' />
                        <div>
                            <IoSearch className='absolute right-4 top-3' />
                        </div>
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                    >
                        Add Baby Cue
                    </button>
                </div>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4">
                {babyCues.map((cue) => (
                    <div
                        key={cue.id}
                        className=" border-2 border-[#344f47] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 rounded-2xl hover:bg-[#344f4718] cursor-pointer"
                    >
                        <div className='flex gap-4 items-start justify-between mb-4'>
                            <img className='w-20' src="/category/Rectangle31555.png" alt="" />
                            <div>
                                <h3 className="text-2xl font-semibold text-[#344f47] ">
                                    {cue.title}
                                </h3>
                                <p className="text-sm text-gray-500">{cue.description}</p>
                                {cue.image && (
                                    <img
                                        src={cue.image.url}
                                        alt={cue.title}
                                        className="w-full h-40 object-cover rounded-lg "
                                    />
                                )}
                            </div>
                            <FaCirclePlay className='ml-2 text-2xl text-[#344f47]' />
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleEditClick(cue)}
                                className="text-[#fff] h-10 w-10 bg-[#344f47]  rounded-full flex items-center justify-center hover:bg-[#2c3e50] transition-colors duration-200"
                            >
                                <RiEdit2Line size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(cue.id)}
                                className="text-[#fff] h-10 w-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit Baby Cue */}
            <Modal
                title={isEditMode ? 'Edit Baby Cue' : 'Add Baby Cue'}
                visible={isModalVisible}
                onOk={handleModalSubmit}
                onCancel={handleCancel}
                footer={[
                    <button
                        key="submit"
                        onClick={handleModalSubmit}
                        className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                    >
                        {isEditMode ? 'Update' : 'Add'}
                    </button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Title" required>
                        <Input
                            className="py-3 "
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter baby cue title"
                        />
                    </Form.Item>

                    <Form.Item label="Description" required>
                        <Input.TextArea
                            className="py-3 "
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Enter baby cue description"
                        />
                    </Form.Item>

                    <Form.Item label="Upload Image" required>
                        <Upload.Dragger
                            name="file"
                            listType="picture-card"
                            beforeUpload={() => false} // Prevent auto upload
                            onChange={handleImageChange}
                            showUploadList={false}
                        >
                            <p className="ant-upload-drag-icon flex items-center justify-center">
                                <IoCloudUploadOutline size={40} />
                            </p>
                            <p className="ant-upload-text">
                                {image ? 'Change Image' : 'Click or drag image to this area to upload'}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BabyCuseSounddetails;
