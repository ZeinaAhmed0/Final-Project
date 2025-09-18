'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Title from '../common/Title';
import OuterContainer from '../common/OuterContainer';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { endPoint } from '@/app/store/UseApisStore';
import axios from 'axios';

function ReservationForm() {
  const { empName } = UseEmpInformationStore();
  const { userData, fetchUser } = UseEmpInformationStore();
  useEffect(() => {
    fetchUser();
  }, []);
  const validationSchema = Yup.object({
    dateFrom: Yup.date().required(),
    dateTo: Yup.date().required().min(Yup.ref('dateFrom'), 'End date cannot be before start date'),
    leavesType: Yup.string().required(),
    notes: Yup.string(),
    description: Yup.string(),
    manager: Yup.string().required(),
    directManager: Yup.string().required(),
  });
  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='reservation request' />
        <hr className='opacity-25' />
      </div>
      <OuterContainer>
        <Formik
          initialValues={{
            dateFrom: '',
            dateTo: '',
            leavesType: '',
            notes: '',
            description: '',
            manager: '',
            directManager: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token');
            const dataToSend = JSON.stringify({ data: { ...values, empName: empName, insertDate: new Date().toISOString().split('T')[0] } });
            try {
              const res = await axios.post(`${endPoint}vacations`, dataToSend, {
                headers: {
                  "Content-Type": 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
              toast.success('Send successfully!');
              resetForm();
            } catch (error) {
              toast.error('Failed to send request. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 p-6 bg-white rounded shadow-md">
              <div>
                <label className='font-semibold'> <span className='text-sky-700 text-xl font-bold'>employee name :</span> {empName}</label>
              </div>

              <div className="flex md:flex-row flex-col justify-between gap-3">
                <div className='flex gap-3'>
                  <label className='text-sky-700 text-xl font-bold' htmlFor="dateFrom">from:</label>
                  <Field name="dateFrom" type="date" className="input input-bordered bg-stone-100" />
                  <ErrorMessage name="dateFrom" component="div" className="text-red-500" />
                </div>

                <div className='flex gap-3'>
                  <label className='text-sky-700 text-xl font-bold' htmlFor="dateTo">to:</label>
                  <Field name="dateTo" type="date" className="input input-bordered bg-stone-100" />
                  <ErrorMessage name="dateTo" component="div" className="text-red-500" />
                </div>
              </div>

              <div className='flex gap-3'>
                <label className='text-sky-700 text-xl font-bold' htmlFor="leavesType">type:</label>
                <Field name="leavesType" as="select" className="select select-bordered bg-stone-100">
                  <option value="annual vacations">annual vacations</option>
                  <option value="emergency vacation">emergency vacation</option>
                  <option value="rest day">rest days</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500" />
              </div>

              <div className='flex gap-3'>
                <label className='text-sky-700 text-xl font-bold' htmlFor="notes">notes:</label>
                <Field name="notes" as="textarea" className="textarea textarea-bordered bg-stone-100" />
              </div>

              <div className='flex gap-3'>
                <label className='text-sky-700 text-xl font-bold' htmlFor="description">description:</label>
                <Field name="description" as="textarea" className="textarea textarea-bordered bg-stone-100" />
              </div>

              <div className='flex gap-3'>
                <label className='text-sky-700 text-xl font-bold' htmlFor="directManager">direct manager:</label>
                <Field name="directManager" as="select" className="select select-bordered bg-stone-100">
                  <option value=""></option>
                  <option value={userData?.[0]?.directManager}>{userData?.[0]?.directManager}</option>
                </Field>
                <ErrorMessage name="directManager" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3'>
                <label className='text-sky-700 text-xl font-bold' htmlFor="manager"> manager:</label>
                <Field name="manager" as="select" className="select select-bordered bg-stone-100">
                  <option value=""></option>
                  <option value={userData?.[0]?.manager}>{userData?.[0]?.manager}</option>
                </Field>
                <ErrorMessage name="manager" component="div" className="text-red-500" />
              </div>

              <div className='flex justify-end'>
                <button type="submit" disabled={isSubmitting} className="btn bg-sky-700">
                  create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </OuterContainer>
    </>
  )
}

export default ReservationForm