import { useNavigate } from 'react-router'

const useVerify = () => {
    const navigate = useNavigate()
    const URL = "https://staging.tishyandco.com.au"

    const verifyOtp = async (param, otp) => {
        try {
            const otpString = otp.join("");
            const response = await fetch(`${URL}/${param}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email: localStorage.getItem("email"), otp: otpString })
            })
            console.log(response)
            if (!response.ok) {
                const errorData = await response.data
                console.log("Error: ", errorData)
                toast.error("Invalid OTP")
                return null;
            }
            const res = await response.json();
            console.log("Success", res)
            toast.success("OTP Verified!!!")
            localStorage.removeItem("email")
            navigate('/login')

        } catch (error) {
            console.log(`Error: `, error)
        }
    }
    return { verifyOtp }
}

export default useVerify