"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/app/store/AuthStore";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/pages/LoadingPage/LoadingPage";
import { UseLoadingStore } from "@/app/store/UseLoadingStore";
import { TfiEmail } from "react-icons/tfi";
import ImgContainer from "../common/ImgContainer";
import { PiLockKey } from "react-icons/pi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

function LoginPage() {
    const router = useRouter();
    const { setToken, fetchToken, isLogin, setIsLogin } = useAuthStore();
    const { loading, setLoading } = UseLoadingStore();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isLogin) {
            router.push("/");
        }
    }, [isLogin, router]);
    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const jwt = await fetchToken(values.email, values.password);
            if (jwt) {
                setToken(jwt);
                setIsLogin(true);
                sessionStorage.setItem("token", jwt);
                router.push("/");
            }
        } catch (error) {
            setIsLogin(false);
            setStatus(error.message);
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            {loading ? (
                <LoadingPage />
            ) : (
                <Formik
                initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting , status }) => (
                        <Form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                            <div className="flex items-center justify-center flex-col mb-3">
                                <ImgContainer
                                    img="/Remove.png"
                                    imgAlt="logo"
                                    className="fill"
                                    smWidth="w-20"
                                    mdWidth="w-25"
                                    height="h-25"
                                />
                                <h2 className="text-xl font-semibold text-center">intranet</h2>
                            </div>
                            <div className="mb-5 relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoFocus
                                    aria-label="Email"
                                    className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-lg">
                                    <TfiEmail />
                                </div>
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-600 text-sm mt-1 mb-3"
                            />
                            <div className="mb-5 relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-lg">
                                    <PiLockKey />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-600 text-sm mt-1 mb-3"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-(--color-primary) text-white py-2 rounded font-bold hover:bg-sky-800 disabled:opacity-50"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                            {status && (
                                <div className="text-red-600 text-sm mt-2 text-center">{status}</div>
                            )}
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default LoginPage;

