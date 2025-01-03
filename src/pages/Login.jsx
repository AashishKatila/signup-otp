import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { LoginSchema } from "../utils/zod";
import useUserAuth from "../hooks/useUserAuth";

import Basket from "../assets/right-side.png";


const Login = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const { authenticateUser } = useUserAuth();

    const onSubmit = async (userDetails) => {
        const userDetail = { email: userDetails.email, password: userDetails.password };
        authenticateUser("login", userDetail);

    }


    function SignInButton() {
        return (
            <button
                className="w-full text-center bg-red-600 py-1 rounded-md text-white"
                type="submit"
            >
                Login
            </button>
        );
    }

    function SignUp() {
        return (
            <div className="text-sm text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <Link to='/signup'>
                    <span className="text-red-600 cursor-pointer">Sign up for free!</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="h-[100vh] flex text-left">
            {/* Form  section */}
            <div className="lg:w-1/2 w-full h-full flex flex-col gap-2 lg:px-44 md:px-24 px-10 justify-center">
                <h2 className="uppercase md:text-4xl text-2xl tracking-wider ">
                    Welcome Back
                </h2>
                <p className="text-gray-400 text-lg">
                    Welcome back! Please enter your details.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 font-semibold "
                >
                    <CustomInput
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        register={register}
                        name="email"
                        error={errors.email}
                    />
                    <CustomInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        name="password"
                        error={errors.password}
                    />
                    <div className="flex justify-between text-sm">
                        <div className="flex gap-2 items-center ">
                            <input type="checkbox" className="cursor-pointer" />
                            <span>Remember me</span>
                        </div>
                        <div className="cursor-pointer">Forgot Password</div>
                    </div>
                    <SignInButton />
                    <SignUp />
                </form>
            </div>
            {/* Image section  */}
            <div className="lg:w-1/2 w-0 h-full">
                <img src={Basket} className="w-full h-full " />
            </div>
        </div>
    );
};

export default Login;
