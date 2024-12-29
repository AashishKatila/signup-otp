
const CustomInput = ({
    label,
    type,
    placeholder,
    register,
    name,
    error,
}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="font-semibold">
                {label}
            </label>

            <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className={`border-2 font-normal rounded-md outline-none py-1 px-4 ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && (
                <span className="text-sm text-red-500 mt-1">{error.message}</span>
            )}
        </div>
    );
};

export default CustomInput;
