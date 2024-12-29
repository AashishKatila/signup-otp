import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password must be less than 12 characters"),
});

export const SignupSchema = z.object({
    full_name: z.string().min(5, "Name must be atleast 5 characters"),
    email: z.string().email("Invalid email"),
    phone_number: z.string().startsWith("+614", { message: "Number should start with +614" }).max(12, "Phone number limit exceeded"),
    password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password must be less than 12 characters"),
    confirm_password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password must be less than 12 characters"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});
