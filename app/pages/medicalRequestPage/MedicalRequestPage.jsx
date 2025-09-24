'use client'
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import Title from '@/app/components/common/Title';
import OuterContainer from '@/app/components/common/OuterContainer';
import { endPoint } from '@/app/store/UseApisStore';

const validationSchema = Yup.object({
    patientName: Yup.string()
        .required('Patient name is required')
        .min(2, 'Patient name must be at least 2 characters'),
    age: Yup.number()
        .required('Age is required')
        .positive('Age must be positive')
        .max(120, 'Age must be less than 120'),
    gender: Yup.string()
        .required('Gender is required'),
    symptoms: Yup.string()
        .required('Symptoms are required')
        .min(10, 'Symptoms description must be at least 10 characters'),
    requestedDate: Yup.date()
        .required('Requested date is required')
        .min(new Date(), 'Date must be today or in the future'),
    additionalNotes: Yup.string()
        .optional(),
});

function MedicalRequestPage() {
    const empName = 'John Doe';

    const initialValues = {
        patientName: '',
        age: '',
        gender: '',
        symptoms: '',
        requestedDate: '',
        additionalNotes: '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const token = localStorage.getItem('token');
        const dataToSend = JSON.stringify({
            data: {
                ...values,
                insertDate: new Date().toISOString().split('T')[0],
            },
        });
        try {
            const res = await axios.post(`${endPoint}medical-requests`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200 || res.status === 201) {
                console.log('Form submitted successfully:', res.data);
                toast.success('Medical request submitted successfully!');
                resetForm();
            } else {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }
        } catch (error) {
            toast.error('Failed to send request. Please try again.');
            console.error(`Error submitting request: ${error.response?.data?.message || error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className='bg-white'>
                <Title title='Medical Request' />
                <hr className='opacity-25 border-gray-300' />
            </div>
            <OuterContainer>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <label className="text-sm font-medium text-gray-700">Employee Name:</label>
                                            <span className="text-sky-700 font-bold">{empName}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-sky-700 border-b border-sky-200 pb-2">Patient Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="patientName">
                                                    Patient Name <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="patientName"
                                                    type="text"
                                                    className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                    placeholder="Enter patient name"
                                                />
                                                <ErrorMessage name="patientName" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="age">
                                                    Age <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="age"
                                                    type="number"
                                                    className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                    placeholder="Enter age"
                                                />
                                                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="gender">
                                                    Gender <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="gender"
                                                    as="select"
                                                    className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Field>
                                                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="requestedDate">
                                                    Requested Date <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="requestedDate"
                                                    type="date"
                                                    className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                />
                                                <ErrorMessage name="requestedDate" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-sky-700 border-b border-sky-200 pb-2">Medical Information</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="symptoms">
                                                    Symptoms <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="symptoms"
                                                    as="textarea"
                                                    rows={4}
                                                    className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                                                    placeholder="Describe the symptoms in detail"
                                                />
                                                <ErrorMessage name="symptoms" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="additionalNotes">
                                                    Additional Notes
                                                </label>
                                                <Field
                                                    name="additionalNotes"
                                                    as="textarea"
                                                    rows={3}
                                                    className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                                                    placeholder="Any additional notes (optional)"
                                                />
                                                <ErrorMessage name="additionalNotes" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn bg-sky-700 hover:bg-sky-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="loading loading-spinner loading-xs mr-2"></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Request'
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </OuterContainer>
        </>
    );
}

export default MedicalRequestPage;