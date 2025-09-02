'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '@/app/store/AuthStore';
import { useRouter } from 'next/navigation';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function LoginPage() {
    const router = useRouter()
    const { token, fetchToken } = useAuthStore();
    const [status, setStatus] = React.useState({});

    const onSubmit = async (values, { setSubmitting }) => {
        setStatus({});

        try {
            const jwt = await fetchToken(values.email, values.password);
            if (jwt) {
                setStatus({ success: 'Login successful!' });
                console.log(jwt);
                localStorage.setItem('token', jwt);
                router.push('/')
            } else {
                setStatus({ error: 'Login failed' });
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
            <Formik
                initialValues={{ id: '', email: '', password: '' }}
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
        </div>
    );
}

export default LoginPage;

