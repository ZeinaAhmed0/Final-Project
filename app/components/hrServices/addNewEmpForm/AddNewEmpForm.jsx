'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OuterContainer from '../../common/OuterContainer';
import axios from 'axios';
import { endPoint } from '@/app/store/UseApisStore';
import Title from '../../common/Title';
import toast, { Toaster } from 'react-hot-toast';

function AddNewEmpForm() {
    const initialValues = {
        fullName: '',
        employeePassword: '',
        employeeEmail: '',
        birthday: '',
        phoneNumber: '',
        salary: '',
        location: '',
        jobTitle: '',
        manager: '',
        department: '',
        subDepartment: '',
        directManager: '',
        annualLeaves: '',
        emergencyLeave: '',
        restDay: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        employeePassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        employeeEmail: Yup.string().email('Invalid email format').required('Email is required'),
        birthday: Yup.date().required('Birthday is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
        location: Yup.string().required('Location is required'),
        jobTitle: Yup.string().required('Job Title is required'),
        manager: Yup.string().required('Manager is required'),
        department: Yup.string().required('Department is required'),
        subDepartment: Yup.string().required('Sub Department is required'),
        directManager: Yup.string().required('Direct Manager is required'),
        annualLeaves: Yup.number(),
        emergencyLeave: Yup.number(),
        restDay:Yup.number(),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const token = localStorage.getItem('token');
        const dataToSend ={data : {...values, phoneNumber: Number(values.phoneNumber),salary: Number(values.salary), restDay: Number(values.restDay), annualLeaves: Number(values.annualLeaves), emergencyLeave: Number(values.emergencyLeave), restDay: Number(values.restDay)} };
        try {
            await axios.post(`${endPoint}employees`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('new employee added successfully!');
            resetForm();
        } catch (error) {
            toast.error('Failed to add. Please try again.');
            console.log(error);
            
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Toaster />
            <div className='bg-white'>
                <Title title='adding new employee' />
                <hr className='opacity-25' />
            </div>
            <OuterContainer>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 p-6 bg-white rounded shadow-md">
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="fullName" className="block font-semibold text-sky-700 mb-1">Full Name :</label>
                                    <Field name="fullName" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="fullName" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="employeePassword" className="block font-semibold text-sky-700 mb-1">Password :</label>
                                    <Field name="employeePassword" type="password" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="employeePassword" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className='flex-1'>
                                    <label htmlFor="employeeEmail" className="block font-semibold text-sky-700 mb-1">Email :</label>
                                    <Field name="employeeEmail" type="email" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="employeeEmail" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="jobTitle" className="block font-semibold text-sky-700 mb-1">Job Title :</label>
                                    <Field name="jobTitle" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="jobTitle" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="birthday" className="block font-semibold text-sky-700 mb-1">Birthday :</label>
                                    <Field name="birthday" type="date" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="birthday" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="phoneNumber" className="block font-semibold text-sky-700 mb-1">Phone Number :</label>
                                    <Field name="phoneNumber" type="number" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="salary" className="block font-semibold text-sky-700 mb-1">Salary :</label>
                                    <Field name="salary" type="number" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="salary" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="location" className="block font-semibold text-sky-700 mb-1">Location :</label>
                                    <Field name="location" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="location" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="directManager" className="block font-semibold text-sky-700 mb-1">Direct Manager :</label>
                                    <Field name="directManager" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="directManager" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="manager" className="block font-semibold text-sky-700 mb-1">Manager :</label>
                                    <Field name="manager" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="manager" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="department" className="block font-semibold text-sky-700 mb-1">Department :</label>
                                    <Field name="department" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="department" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="subDepartment" className="block font-semibold text-sky-700 mb-1">Sub Department :</label>
                                    <Field name="subDepartment" type="text" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="subDepartment" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='flex-1'>
                                    <label htmlFor="annualLeaves" className="block font-semibold text-sky-700 mb-1">annual leaves :</label>
                                    <Field name="annualLeaves" type="number" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="annualLeaves" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="emergencyLeave" className="block font-semibold text-sky-700 mb-1">emergency leave :</label>
                                    <Field name="emergencyLeave" type="number" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="emergencyLeave" component="div" className="text-red-500 mt-1" />
                                </div>
                                <div className='flex-1'>
                                    <label htmlFor="restDay" className="block font-semibold text-sky-700 mb-1">rest days :</label>
                                    <Field name="restDay" type="number" className="input input-bordered bg-stone-100 w-full" />
                                    <ErrorMessage name="restDay" component="div" className="text-red-500 mt-1" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" disabled={isSubmitting} className="btn bg-sky-700">
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </OuterContainer>
        </>
    );
}

export default AddNewEmpForm;
