import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../utils/zod";
import { Link } from "react-router";
import Basket from "../assets/right-side.png";
import useUserAuth from "../hooks/useUserAuth";


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignupSchema),
    });


    const { authenticateUser } = useUserAuth()

    const onSubmit = async (userDetails) => {

        const formattedUserDetails = { ...userDetails, phone_number: `+614${userDetails.phone_number}` }
        console.log("Details = ", formattedUserDetails)

        try {
            await authenticateUser("signup", formattedUserDetails);
        } catch (error) {
            console.error("Signup error:", error);
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
                    placeholder="12xxxxxx"
                    type="text"
                    register={register}
                    name="phone_number"
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
