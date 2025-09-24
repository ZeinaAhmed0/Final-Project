'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { endPoint } from '@/app/store/UseApisStore';
import axios from 'axios';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import OuterContainer from '../../common/OuterContainer';
import Title from '../../common/Title';

function CarRequestForm() {
  const {empName} = UseEmpInformationStore();
  const validationSchema = Yup.object({
    driverName: Yup.string().required(),
    numberOfPassengers: Yup.number().required(),
    carType: Yup.string().required(),
    yourLocation: Yup.string().required(),
    destination: Yup.string().required(),
    dateFrom: Yup.date().required(),
    dateTo: Yup.date().required().min(Yup.ref('dateFrom'), 'End date cannot be before start date'),
    reason: Yup.string().required(),
    notes: Yup.string(),
    serviceType: Yup.string().required(),
  });

  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='car request' />
        <hr className='opacity-25' />
      </div>
      <OuterContainer>
        <Formik
          initialValues={{
            driverName: '',
            numberOfPassengers: 0,
            carType: '',
            yourLocation: '',
            destination: '',
            dateFrom: '',
            dateTo: '',
            reason: '',
            notes: '',
            serviceType: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token');
            const dataToSend = JSON.stringify({
              data: {
                ...values,
                insertDate: new Date().toISOString().split('T')[0],
                empName: empName,
              },
            });
            try {
              const res = await axios.post(`${endPoint}car-requests`, dataToSend, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
              toast.success('Request sent successfully!');
              resetForm();
            } catch (error) {
              toast.error('Failed to send request. Please try again.');
              console.log(error);
              
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 p-6 bg-white rounded shadow-md mx-auto capitalize">
              <div className="flex items-center justify-between">
                <div>
                <label className='font-semibold'> <span className='text-sky-700 text-xl font-bold'>employee name :</span> {empName}</label>
              </div>
              <div>
                <label className='font-semibold'> <span className='text-sky-700 text-xl font-bold'>insert date :</span>  {new Date().toISOString().split('T')[0]}</label>
              </div>
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="driverName" className='text-sky-700 text-xl font-bold mb-1'>Driver:</label>
                <Field name="driverName" as="select" className="select select-bordered bg-stone-100" >
                  <option hidden> choose driver </option>
                  <option value="ramy hany">ramy hany</option>
                  <option value="adam youssef">adam youssef</option>
                  <option value="zain adam">zain adam</option>
                </Field>
                <ErrorMessage name="driverName" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="numberOfPassengers" className='text-sky-700 text-xl font-bold mb-1'>Number of Passengers:</label>
                <Field name="numberOfPassengers" type="number" min="1" max="20" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="numberOfPassengers" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="carType" className='text-sky-700 text-xl font-bold mb-1'>Type of the Car:</label>
                <Field name="carType" as="select" className="select select-bordered bg-stone-100">
                  <option hidden> Select Car Type </option>
                  <option value="sedan">sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">van</option>
                  <option value="pickup truck">pickup truck</option>
                  <option value="truck">truck</option>
                </Field>
                <ErrorMessage name="carType" component="div" className="text-red-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className='flex gap-3 items-center'>
                <label htmlFor="yourLocation" className='text-sky-700 text-xl font-bold mb-1'>your location</label>
                <Field name="yourLocation" type="text" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="yourLocation" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="destination" className='text-sky-700 text-xl font-bold mb-1'>destination</label>
                <Field name="destination" type="text" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="destination" component="div" className="text-red-500" />
              </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                <label htmlFor="dateFrom" className='text-sky-700 text-xl font-bold mb-1'>date from:</label>
                <Field name="dateFrom" type="date" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="dateFrom" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="dateTo" className='text-sky-700 text-xl font-bold mb-1'>Date To:</label>
                <Field name="dateTo" type="date" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="dateTo" component="div" className="text-red-500" />
              </div>
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="reason" className='text-sky-700 text-xl font-bold mb-1'>Reason:</label>
                <Field name="reason" as="textarea" className="textarea textarea-bordered bg-stone-100" />
                <ErrorMessage name="reason" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="notes" className='text-sky-700 text-xl font-bold mb-1'>Notes:</label>
                <Field name="notes" as="textarea" className="textarea textarea-bordered bg-stone-100" />
                <ErrorMessage name="notes" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="serviceType" className='text-sky-700 text-xl font-bold mb-1'>Type of Service:</label>
                <Field name="serviceType" as="select" className="select select-bordered bg-stone-100">
                  <option hidden> Select Service Type </option>
                  <option value="hr">hr</option>
                  <option value="procurement and supply">procurement and supply</option>
                  <option value="operation">operation</option>
                  <option value="transportation">transportation</option>
                </Field>
                <ErrorMessage name="serviceType" component="div" className="text-red-500" />
              </div>
              <div className='flex justify-end'>
                <button type="submit" disabled={isSubmitting} className="btn bg-sky-700 text-white">
                  Submit Request
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </OuterContainer>
    </>
  );
}

export default CarRequestForm;
