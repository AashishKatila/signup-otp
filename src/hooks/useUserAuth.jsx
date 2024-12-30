import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { OtpContext } from '../context/otpContext'

const useUserAuth = () => {

    const navigate = useNavigate()
    const URL = "https://staging.tishyandco.com.au"

    const { handleInterval } = useContext(OtpContext)

    const handleRequest = async (endpoint, data) => {
        console.log("EndPoint = ", endpoint)
        console.log(data)

        try {
            const response = await fetch(`${URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            console.log("Response = ", response)

            if (!response.ok) {
                const errorData = await response.data
                toast.error(errorData.message || "Something went wrong")
                console.log("Error: ", errorData)
                return null
            }

            const res = await response.json();
            console.log("Success", res)
            return res


        } catch (error) {
            toast.error("Network error.")
            console.log("Error: ", error)
            return null;
        }
    }

    const authenticateUser = async (type, userDetails) => {
        const endpoint = type === "signup" ? "v1/users/" : "v1/auth/login/";
        const response = await handleRequest(endpoint, userDetails)
        console.log("After authenticate : ", response)

        if (response) {
            if (type === "signup") {
                const otpResponse = await handleRequest('v1/users/send_otp/', {
                    phone_number: userDetails.phone_number, email: userDetails.email
                })

                if (otpResponse) {
                    handleInterval()
                    toast.success("OTP sent successfully")
                    localStorage.setItem("email", userDetails.email)
                    navigate('/verify-otp')
                }
            } else if (type === "login") {
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token.access);
                localStorage.setItem("user_name", response.data.full_name);
                console.log(localStorage.getItem("user_name"))
                navigate("/dashboard");
            }
        }
    }

    return { authenticateUser }
}

export default useUserAuth