import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiVolume2, FiSmile } from 'react-icons/fi'; // You can use any other icon you prefer
import { Link } from 'react-router-dom';

const BabyCuse = () => {
    return (
        <div className="p-4">
            {/* Header Section with Back Button */}
            <div className="flex justify-between items-center py-4 mb-5">
                <Link className="text-2xl font-bold text-[#344f47] hover:text-[#344f47] flex items-center gap-2" to="/baby-cuse">
                    <FaArrowLeft />
                    <h1>Baby Cues</h1>
                </Link>
            </div>

            {/* Cards Section */}
            <div className="flex gap-4 flex-wrap">

                {/* Baby Cues Card */}
                <Link to="/baby-cuse/baby-case-details" className="relative w-60 h-28 rounded-lg border border-[#344f47] bg-[#f1f8f5] cursor-pointer flex gap-2">
                    <div className=" bg-[#344f47] p-2 text-white rounded-l-lg flex items-center justify-center">
                        <img className='w-10' src="/category/cuse.png" alt="" />
                    </div>
                    <div className='h-full flex items-center w-full  justify-center text-[#344f47] text-xl'>
                        <p className='!font-bold'>Baby Cues</p>
                    </div>
                </Link>

                {/* Sound Card */}
                <Link to="/baby-cuse/sound-details" className="relative w-60 h-28 rounded-lg border border-[#344f47] bg-[#f1f8f5] cursor-pointer flex gap-2">
                    <div className=" bg-[#ccc49d] p-2 text-white rounded-l-lg flex items-center justify-center">
                        <img className='w-10' src="/category/Volume-down.png" alt="" />
                    </div>
                    <div className='h-full flex items-center w-full  justify-center text-[#344f47] text-xl'>
                        <p className='!font-bold'>Sound</p>
                    </div>
                </Link>
                {/* Sound Card */}
                <Link to="/baby-cuse/southing-details" className="relative w-60 h-28 rounded-lg border border-[#344f47] bg-[#f1f8f5] cursor-pointer flex gap-2">
                    <div className=" bg-[#f9e4c8] p-2 text-white rounded-l-lg flex items-center justify-center">
                        <img className='w-10' src="/category/Southing.png" alt="" />
                    </div>
                    <div className='h-full flex items-center w-full  justify-center text-[#344f47] text-xl'>
                        <p className='!font-bold'>Southing</p>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default BabyCuse;
