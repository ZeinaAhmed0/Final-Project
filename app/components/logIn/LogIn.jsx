'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '@/app/store/AuthStore';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function LoginPage() {
    const router = useRouter()
    const {setToken, fetchToken, isLogin, setIsLogin } = useAuthStore();
    const { loading, setLoading } = UseLoadingStore()
    const [status, setStatus] = useState({});
    const onSubmit = async (values, { setSubmitting }) => {
        setStatus({});
        try {
            const jwt = await fetchToken(values.email, values.password);
            if (jwt) {
                setToken(jwt);
                setIsLogin(true);
                localStorage.setItem('token', jwt);
                setStatus({ success: 'Login successful!' });
                router.push('/');
            } else {
                setStatus({ error: 'Login failed' });
                setIsLogin(false);
            }
        } catch (error) {
            setStatus({ error: 'Login failed' });
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            {
                loading ? <LoadingPage /> : (
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                                {status.error && (
                                    <div className="text-red-500 text-center mb-4">{status.error}</div>
                                )}
                                {status.success && (
                                    <div className="text-green-500 text-center mb-4">{status.success}</div>
                                )}
                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 font-semibold">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-sky-700 text-white py-2 rounded font-bold hover:bg-sky-800"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )
            }
        </div>
    );
}

export default LoginPage;

