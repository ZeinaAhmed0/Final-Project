'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OuterContainer from '../common/OuterContainer';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { useApisStore } from '@/app/store/UseApisStore';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { endPoint } from '@/app/store/UseApisStore';
import axios from 'axios';
import Title from '@/app/components/common/Title';

function WorkOrderForm() {
    const { fetchUser,empName } = UseEmpInformationStore();
    const { fetchApi } = useApisStore();

    useEffect(() => {
        fetchUser();
        fetchApi();
    }, []);

    const validationSchema = Yup.object({
        serviceType: Yup.string().required('Service type is required'),
        department: Yup.string().required('Department is required'),
        requestField: Yup.string().required('Request field is required'),
        serviceDescription: Yup.string().required('Service description is required'),
        priorityLevel: Yup.string().required('Priority level is required'),
    });

    return (
        <>
            <Toaster />
            <div className='bg-white'>
                <Title title='work order' />
                <hr className='opacity-25 border-gray-300' />
            </div>
            <OuterContainer>
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                        <Formik
                            initialValues={{
                                serviceType: '',
                                department: '',
                                requestField: '',
                                serviceDescription: '',
                                priorityLevel: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                const token = localStorage.getItem('token');
                                const dataToSend = JSON.stringify({
                                    data: {
                                        ...values,
                                        empName: empName,
                                        insertDate: new Date().toISOString().split('T')[0]
                                    }
                                });
                                try {
                                    const res = await axios.post(`${endPoint}work-orders`, dataToSend, {
                                        headers: {
                                            "Content-Type": 'application/json',
                                            Authorization: `Bearer ${token}`,
                                        },
                                    });
                                    if (res.status === 200 || res.status === 201) {
                                        toast.success('Service request submitted successfully!');
                                        resetForm();
                                    }
                                } catch (error) {
                                    toast.error('Failed to send request. Please try again.');
                                    console.error(`Error submitting request: ${error.response?.data?.message || error.message}`);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <label className="text-sm font-medium text-gray-700">Employee Name:</label>
                                            <span className="text-sky-700 font-bold">{empName}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <label className="text-sm font-medium text-gray-700">Insert Date:</label>
                                            <span className="text-sky-700 font-bold">{new Date().toISOString().split('T')[0]}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-sky-700 border-b border-sky-200 pb-2">Service Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="serviceType">
                                                    Service Type <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="serviceType"
                                                    as="select"
                                                    className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                >
                                                    <option hidden>Select Service Type</option>
                                                    <option value="technical">Technical</option>
                                                    <option value="administrative">Administrative</option>
                                                    <option value="maintenance">Maintenance</option>
                                                    <option value="support">Support</option>
                                                </Field>
                                                <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="department">
                                                    Department <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="department"
                                                    as="select"
                                                    className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                >
                                                    <option hidden>Select Department</option>
                                                    <option value='production'>production</option>
                                                    <option value='project'>project</option>
                                                    <option value='procurement and supply'>procurement and supply</option>
                                                    <option value='HSE'>HSE</option>
                                                    
                                                </Field>
                                                <ErrorMessage name="department" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="requestField">
                                                    Request Field <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="requestField"
                                                    as="select"
                                                    className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                                >
                                                    <option hidden>Select Request Field</option>
                                                    <option value="it">IT</option>
                                                    <option value="hr">HR</option>
                                                    <option value="finance">Finance</option>
                                                    <option value="operations">Operations</option>
                                                    <option value="marketing">Marketing</option>
                                                </Field>
                                                <ErrorMessage name="requestField" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                            <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700" htmlFor="priorityLevel">
                                                Priority Level <span className="text-red-500">*</span>
                                            </label>
                                            <Field
                                                name="priorityLevel"
                                                as="select"
                                                className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                                            >
                                                <option hidden>Select Priority Level</option>
                                                <option value="high">High</option>
                                                <option value="medium">Medium</option>
                                                <option value="low">Low</option>
                                            </Field>
                                            <ErrorMessage name="priorityLevel" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-sky-700 border-b border-sky-200 pb-2">Service Description</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700" htmlFor="serviceDescription">
                                                    Service Description <span className="text-red-500">*</span>
                                                </label>
                                                <Field
                                                    name="serviceDescription"
                                                    as="textarea"
                                                    rows={4}
                                                    className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                                                    placeholder="Describe the required service in detail"
                                                />
                                                <ErrorMessage name="serviceDescription" component="div" className="text-red-500 text-sm mt-1" />
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
    )
}

export default WorkOrderForm