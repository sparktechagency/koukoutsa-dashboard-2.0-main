import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ApartmentCreatorCreate = () => {
    const [form] = Form.useForm();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handle form submission
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    // Validate confirm password
    const checkConfirmPassword = (_, value) => {
        if (!value || value === password) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match'));
    };

    return (
        <div className="mt-10 ">
            <Link to="/apartment-creator" className="text-2xl font-semibold mb-4 flex items-center gap-2"> <FaArrowLeft />Account create</Link>
            <div className="w-full max-w-[600px] border border-[#2cb5eb] mt-5 p-6 bg-white  rounded-lg">
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                >
                    {/* User Name */}
                    <Form.Item
                        label="User Name"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your User Name!' }]}
                    >
                        <Input placeholder="Enter your user name" />
                    </Form.Item>

                    {/* User Email */}
                    <Form.Item
                        label="User Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    {/* Phone Number */}
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    {/* Role */}
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Input placeholder="Enter the role" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters long' },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </Form.Item>

                    {/* Confirm Password */}
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            { validator: checkConfirmPassword },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                        />
                    </Form.Item>

                    {/* Create Account Button */}
                    <Form.Item className='flex justify-center'>
                        <button className='bg-[#2cb5eb] text-white py-3 px-10 text-base rounded-md' >
                            Create Account
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ApartmentCreatorCreate;
