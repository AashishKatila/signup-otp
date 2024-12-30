import React, { createContext, useState } from 'react'

const OtpContext = createContext()

const OtpProvider = ({ children }) => {
    const [otpAvailability, setOtpAvailability] = useState(false)

    const handleInterval = () => {
        setOtpAvailability(true)
        const timeoutId = setTimeout(() => {
            setOtpAvailability(false)
        }, 10000)
        return timeoutId
    }
    return (
        <OtpContext.Provider value={{ otpAvailability, setOtpAvailability, handleInterval }}>
            {children}
        </OtpContext.Provider>
    )
}

export { OtpContext, OtpProvider }