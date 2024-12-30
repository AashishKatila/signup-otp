import React, { useState } from 'react'
import useVerify from '../hooks/useVerify';

const Verify = () => {

    const { verifyOtp } = useVerify()

    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Only allow a single digit (0-9)
        if (/[^0-9]/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        verifyOtp("v1/users/verify_email_otp/", otp)
    }

    return (
        <div className='flex flex-col h-screen gap-10 justify-center items-center'>
            <h1 className='text-xl md:text-3xl '>Verify your OTP</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                <div className="flex gap-4 items-center">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className="md:w-10 md:h-10 w-6 h-6 bg-gray-200 rounded-md text-center"
                        />
                    ))}
                </div>
                <button type='submit' className='bg-green-400 px-6 py-1 rounded-md text-white'>Verify</button>
            </form>
        </div>
    )
}

export default Verify