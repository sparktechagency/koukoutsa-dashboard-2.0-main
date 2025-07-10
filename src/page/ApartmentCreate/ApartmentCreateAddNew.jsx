import React, { useState } from 'react';
import { Form, Input, Button, message, Steps, Upload, Select, Space, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { FaRegCircleCheck } from 'react-icons/fa6';

const { Step } = Steps;

const ApartmentCreateAddNew = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [apartmentData, setApartmentData] = useState({
        price: '',
        idCard: '',
        incomeTaxDoc: '',
        creditApplicationDoc: '',
        newFacility: '',
        images: [],
        facilities: [],
        name: '',
        location: '',
        description: '',
        floorType: '',
        unitPrice: '',
        unitTerms: '',
        thumbnail: null,
        unitName: '',
        units: [],
        numberOfUnits: '',
    });

    // Handle Step Change
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    // Handle Form Submit
    const onSubmit = () => {
        console.log('Form Submitted', apartmentData);
        message.success('Apartment created successfully!');
    };

    // Handle Input Change for Each Step
    const handleInputChange = (key, value) => {
        setApartmentData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle Image Upload
    const handleImageUpload = ({ fileList }) => {
        setApartmentData((prev) => ({
            ...prev,
            images: fileList,
        }));
    };

    // Handle File Change for Thumbnail and Images
    const handleFileChange = (info, type) => {
        if (type === 'thumbnail') {
            setApartmentData((prev) => ({
                ...prev,
                thumbnail: info.fileList[0],
            }));
        } else if (type === 'images') {
            setApartmentData((prev) => ({
                ...prev,
                images: info.fileList,
            }));
        }
    };

    // Facilities Change
    const handleFacilitiesChange = (checkedValues) => {
        setApartmentData((prev) => ({
            ...prev,
            facilities: checkedValues,
        }));
    };

    // Handle Add Facility
    const handleAddFacility = () => {
        if (apartmentData.newFacility) {
            setApartmentData((prev) => ({
                ...prev,
                facilities: [...prev.facilities, apartmentData.newFacility],
                newFacility: '', // Clear the input after adding the facility
            }));
        } else {
            message.error('Please enter a facility!');
        }
    };

    // Handle Unit Name Addition
    const handleAddUnit = () => {
        if (apartmentData.unitName) {
            setApartmentData((prev) => ({
                ...prev,
                units: [...prev.units, `${apartmentData.unitName} ${prev.units.length + 1}`],
                unitName: '', // Clear the unit name field
            }));
        } else {
            message.error('Please enter a unit name!');
        }
    };

    return (
        <div className="apartment-create-container my-20 mx-auto" style={{ maxWidth: '800px', padding: '20px' }}>
            <Steps current={current} onChange={setCurrent} style={{ marginBottom: '20px' }}>
                <Step title="Apartment Info" />
                <Step title="Description & Price" />
                <Step title="Facilities" />
                <Step title="Images" />
                <Step title="Review & Submit" />
            </Steps>

            <Form form={form} layout="vertical" onFinish={onSubmit}>
                {/* Step 1: Apartment Info */}
                {current === 0 && (
                    <div className="border border-[#39ceec] rounded-lg p-5">
                        {/* Form Submission Fee */}
                        <Form.Item label="Form Submission Fee" required>
                            <Input
                                value={apartmentData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                className="py-2"
                                placeholder="Form submission fee"
                            />
                        </Form.Item>

                        {/* Submit Income Tax Doc */}
                        <Form.Item label="Submit Income Tax Doc" required>
                            <div className="flex items-center gap-6">
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitIncomeTaxDocYes">
                                    <input
                                        type="radio"
                                        id="submitIncomeTaxDocYes"
                                        name="submitIncomeTaxDoc"
                                        value="yes"
                                        onChange={(e) => handleInputChange('incomeTaxDoc', e.target.value)} // Update the state
                                    />
                                    Yes
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitIncomeTaxDocNo">
                                    <input
                                        type="radio"
                                        id="submitIncomeTaxDocNo"
                                        name="submitIncomeTaxDoc"
                                        value="no"
                                        onChange={(e) => handleInputChange('incomeTaxDoc', e.target.value)} // Update the state
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Item>

                        {/* Submit ID Card */}
                        <Form.Item label="Submit ID Card" required>
                            <div className="flex items-center gap-6">
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitIdCardYes">
                                    <input
                                        type="radio"
                                        id="submitIdCardYes"
                                        name="submitIdCard"
                                        value="yes"
                                        onChange={(e) => handleInputChange('idCard', e.target.value)} // Update the state
                                    />
                                    Yes
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitIdCardNo">
                                    <input
                                        type="radio"
                                        id="submitIdCardNo"
                                        name="submitIdCard"
                                        value="no"
                                        onChange={(e) => handleInputChange('idCard', e.target.value)} // Update the state
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Item>

                        {/* Submit Credit Application Doc */}
                        <Form.Item label="Submit Credit Application Doc" required>
                            <div className="flex items-center gap-6">
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitCreditApplicationDocYes">
                                    <input
                                        type="radio"
                                        id="submitCreditApplicationDocYes"
                                        name="submitCreditApplicationDoc"
                                        value="yes"
                                        onChange={(e) => handleInputChange('creditApplicationDoc', e.target.value)} // Update the state
                                    />
                                    Yes
                                </label>
                                <label className="flex cursor-pointer items-center gap-2 text-xl" htmlFor="submitCreditApplicationDocNo">
                                    <input
                                        type="radio"
                                        id="submitCreditApplicationDocNo"
                                        name="submitCreditApplicationDoc"
                                        value="no"
                                        onChange={(e) => handleInputChange('creditApplicationDoc', e.target.value)} // Update the state
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Item>
                    </div>
                )}

                {/* Step 2: Description & Price */}
                {current === 1 && (
                    <div className="border border-[#39ceec] rounded-lg p-5">
                        <Form.Item label="Apartment Name" required>
                            <Input
                                value={apartmentData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter apartment name"
                            />
                        </Form.Item>

                        <Form.Item label="Location" required>
                            <Input
                                value={apartmentData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="Enter location"
                            />
                        </Form.Item>

                        <Form.Item label="Apartment Description" required>
                            <Input.TextArea
                                value={apartmentData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows={4}
                                placeholder="Enter description of the apartment"
                            />
                        </Form.Item>

                        <Form.Item label="Upload Thumbnail" required>
                            {/* Dragger Component for file upload */}
                            <Dragger
                                fileList={apartmentData.thumbnail ? [apartmentData.thumbnail] : []}
                                beforeUpload={() => false} // Prevent automatic upload
                                onChange={(info) => handleFileChange(info, 'thumbnail')}
                                maxCount={1}
                                showUploadList={{ showRemoveIcon: true }}
                                accept=".jpeg,.png" // Ensure only jpeg/png are accepted
                            >
                                <p className="ant-upload-drag-icon">
                                    <UploadOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">File format: .jpeg, .png & Max file size: 25 MB</p>
                            </Dragger>
                        </Form.Item>
                    </div>
                )}

                {/* Step 3: Facilities */}
                {current === 2 && (
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
                        <div className="mb-6">
                            <img src="/Apartment/icons/bro.png" alt="Apartment Illustration" className="w-full max-w-[300px] mx-auto" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Start adding units within your Apartment here.
                        </h2>

                    </div>
                )}

                {/* Step 4: Image Upload */}
                {current === 3 && (
                    <div className="border border-[#39ceec] rounded-lg p-5">
                        <Form.Item label="Unit Name" required>
                            <Select
                                value={apartmentData.unitName}
                                onChange={(value) => handleInputChange('unitName', value)}
                                placeholder="Select Unit Name"
                            >
                                <Select.Option value="Studio">Studio</Select.Option>
                                <Select.Option value="Bed Room">Bed Room</Select.Option>
                                <Select.Option value="2 Bed Room">2 Bed Room</Select.Option>
                                <Select.Option value="3 Bed Room">3 Bed Room</Select.Option>
                                <Select.Option value="Pent House">Pent House</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Number of Units" required>
                            <Input
                                value={apartmentData.numberOfUnits}
                                onChange={(e) => handleInputChange('numberOfUnits', e.target.value)}
                                placeholder="Enter number of units"
                                type="number"
                            />
                        </Form.Item>
                    </div>
                )}

                {/* Step 5: Review & Submit */}
                {current === 4 && (
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                        {/* Apartment Name */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Name</label>
                            <div className="p-3 border rounded-lg bg-gray-100">
                                <span>Studio</span>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Facilities</label>
                            <div className="p-3 border rounded-lg bg-gray-100">
                                <span>1 Kitchen Room</span>
                            </div>
                            <button className="text-blue-500 text-sm">Add Facilities</button>
                        </div>

                        {/* Unit Price */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Unit Price</label>
                            <div className="p-3 border rounded-lg bg-gray-100">
                                <span>$1590</span>
                            </div>
                        </div>

                        {/* Unit Terms */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Unit Terms</label>
                            <div className="p-3 border rounded-lg bg-gray-100">
                                <span>Select</span>
                            </div>
                        </div>

                        {/* Floor Type */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Floor Type</label>
                            <div className="p-3 border rounded-lg bg-gray-100">
                                <span>1st Floor</span>
                            </div>
                        </div>

                        {/* Upload Apartment Image */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Upload your Apartment Image</label>
                            <div className="border-dashed border-2 border-gray-300 p-8 text-center rounded-lg bg-gray-50">
                                <div className="mb-4 text-gray-500">
                                    <p>Drop file or browse</p>
                                    <p className="text-sm">Format: .jpeg, .png & Max file size: 25 MB</p>
                                </div>
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">Browse Files</button>
                            </div>
                        </div>

                    </div>
                )}
                {
                    current === 5 && (
                        <div className='text-center my-20'>
                            {/* submit successfully desing need to add  */}
                            <div className='flex flex-col items-center'>
                                <FaRegCircleCheck className='text-6xl text-green-600' />
                                <h3 className='text-2xl my-5 text-green-600'>Apartment created successfully</h3>
                                <Button type="default" onClick={prev}  >
                                    Previous
                                </Button>
                            </div>

                        </div>
                    )
                }

                {/* Navigation buttons */}
                {
                    current < 5 && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Button type="default" onClick={prev} disabled={current === 0}>
                                Previous
                            </Button>
                            <Button type="primary" onClick={next} style={{ marginLeft: '10px' }}>
                                {current === 4 ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    )
                }


            </Form>
        </div>
    );
};

export default ApartmentCreateAddNew;
