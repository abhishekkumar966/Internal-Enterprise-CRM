import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Lock,
    User,
    ShieldCheck,
    Eye,
    EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import { login } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!form.username.trim()) {
            toast.error("Username is required");
            return;
        }

        if (!form.password.trim()) {
            toast.error("Password is required");
            return;
        }

        try {
            setLoading(true);

            const res = await login(form);

            localStorage.setItem("token", res.access_token);

            toast.success("Login Successful");

            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Invalid Username or Password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-6">

            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-blue-700 text-white p-12">

                    <ShieldCheck size={60} className="mb-6" />

                    <h1 className="text-4xl font-bold mb-4">
                        Internal Enterprise CRM
                    </h1>

                    <p className="text-blue-100 leading-7">
                        Unified CRM Platform for managing
                        Subscription Plans, Message Templates,
                        and Client Sites.
                    </p>

                    <div className="mt-12 space-y-4">

                        <div className="flex items-center gap-3">
                            ✅ Secure JWT Authentication
                        </div>

                        <div className="flex items-center gap-3">
                            ✅ Multi Product Management
                        </div>

                        <div className="flex items-center gap-3">
                            ✅ Enterprise Dashboard
                        </div>

                    </div>

                </div>

                {/* Right Side */}
                <div className="p-10">

                    <div className="text-center mb-8">

                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Sign in to continue
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <div className="mt-2 relative">

                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="mt-2 relative">

                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full border rounded-xl py-3 pl-11 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition disabled:opacity-60"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-8 rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
                        <p className="font-semibold mb-2">
                            Demo Credentials
                        </p>

                        <p>
                            <strong>Username:</strong> admin
                        </p>

                        <p>
                            <strong>Password:</strong> admin123
                        </p>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        © 2026 Internal Enterprise CRM Platform
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;