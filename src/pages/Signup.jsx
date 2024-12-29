import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../utils/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

import Basket from "../assets/right-side.png";


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignupSchema),
    });

    const navigate = useNavigate()

    const onSubmit = async (userDetails) => {
        console.log(userDetails);
        try {

            const response = await fetch("https://staging.tishyandco.com.au/v1/users/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })

            // console.log("Response = ", response)

            if (!response.ok) {
                const errorData = await response.data
                // console.log("Error: ", errorData)
            } else {
                const res = await response.json();
                // console.log("Success", res)

                // const { phone_number, email } = { userDetails }
                // console.log(userDetails.email, userDetails.phone_number)

                const otp_response = await fetch("https://staging.tishyandco.com.au/v1/users/send_otp/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ phone_number: userDetails.phone_number, email: userDetails.email })
                })

                if (!otp_response.ok) {
                    const errorData = await otp_response.data
                    // console.log("Error in sending OTP: ", errorData)
                    toast.error("Error in sending OTP")
                } else {
                    const res = await otp_response.json();
                    // console.log("OTP has been sent successfully", res)
                    toast.success("OTP has been succesfully sent")
                    localStorage.setItem("email", userDetails.email)
                    navigate('/verify-otp')
                }
            }
        } catch (error) {
            console.log("Network error: ", error)
        }

    };

    function Intro() {
        return (
            <>
                <h2 className="uppercase md:text-4xl text-2xl tracking-wider ">
                    Welcome
                </h2>
                <p className="text-gray-400 text-lg">
                    Please enter your details.
                </p>
            </>
        )
    }

    function AllInputs() {
        return (
            <>
                <CustomInput
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    register={register}
                    name="full_name"
                    error={errors.full_name}
                />
                <CustomInput
                    label="Email"
                    placeholder="johndoe123@gmail.com"
                    type="email"
                    register={register}
                    name="email"
                    error={errors.email}
                />
                <CustomInput
                    label="Phone Number"
                    placeholder="12345678"
                    type="text"
                    register={register}
                    name="phone_number"
                    prefix="+614"
                    error={errors.phone_number}
                />
                <CustomInput
                    label="Password"
                    placeholder="********"
                    type="password"
                    register={register}
                    name="password"
                    error={errors.password}
                />
                <CustomInput
                    label="Confirm Password"
                    placeholder="********"
                    type="password"
                    register={register}
                    name="confirm_password"
                    error={errors.confirm_password}
                />
            </>
        );
    }

    function Login() {
        return (
            <div className="text-md text-center">
                <span className="text-gray-500">Already have an account? </span>
                <Link to='/login'>
                    <span className="text-blue-600 font-semibold cursor-pointer">Login</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="h-[100vh] flex text-left">
            {/* Image section  */}
            <div className="lg:w-1/2 w-0 h-full">
                <img src={Basket} className="w-full h-full scale-x-[-1] " />
            </div>
            {/* Form  section */}
            <div className="lg:w-1/2 w-full h-full flex flex-col gap-2 lg:px-44 md:px-24 px-10 justify-center">
                <Intro />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 font-semibold "
                >
                    <AllInputs />

                    <button
                        className="w-full text-center bg-red-600 py-1 rounded-md text-white"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <Login />
            </div>

        </div>
    );
};

export default Signup;
