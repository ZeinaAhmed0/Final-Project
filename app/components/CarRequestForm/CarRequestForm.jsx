'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Title from '../common/Title';
import OuterContainer from '../common/OuterContainer';
import toast, { Toaster } from 'react-hot-toast';
import { endPoint } from '@/app/store/UseApisStore';
import axios from 'axios';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';

function CarRequestForm() {
  const {empName} = UseEmpInformationStore();
  const validationSchema = Yup.object({
    driver: Yup.string().required('Driver is required'),
    numberOfPassengers: Yup.number()
      .required('Number of passengers is required')
      .min(1, 'At least 1 passenger')
      .max(20, 'Maximum 20 passengers'),
    carType: Yup.string().required('Car type is required'),
    from: Yup.string().required('From place is required'),
    to: Yup.string().required('To place is required'),
    dateFrom: Yup.date().required('Start date is required'),
    dateTo: Yup.date()
      .required('End date is required')
      .min(Yup.ref('dateFrom'), 'End date cannot be before start date'),
    reason: Yup.string().required('Reason is required'),
    notes: Yup.string(),
    serviceType: Yup.string().required('Service type is required'),
  });

  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='Car Request' />
        <hr className='opacity-25' />
      </div>
      <OuterContainer>
        <Formik
          initialValues={{
            driver: '',
            numberOfPassengers: '',
            carType: '',
            from: '',
            to: '',
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
                requestDate: new Date().toISOString().split('T')[0],
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
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 p-6 bg-white rounded shadow-md mx-auto">
              <div className="flex items-center justify-between">
                <div>
                <label className='font-semibold'> <span className='text-sky-700 text-xl font-bold'>employee name :</span> {empName}</label>
              </div>
              <div>
                <label className='font-semibold'> <span className='text-sky-700 text-xl font-bold'>insert date :</span>  {new Date().toISOString().split('T')[0]}</label>
              </div>
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="driver" className='text-sky-700 text-xl font-bold mb-1'>Driver:</label>
                <Field name="driver" type="text" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="driver" component="div" className="text-red-500" />
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
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="bus">Bus</option>
                </Field>
                <ErrorMessage name="carType" component="div" className="text-red-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className='flex gap-3 items-center'>
                <label htmlFor="from" className='text-sky-700 text-xl font-bold mb-1'>From (Place):</label>
                <Field name="from" type="text" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="from" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="to" className='text-sky-700 text-xl font-bold mb-1'>To (Place):</label>
                <Field name="to" type="text" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="to" component="div" className="text-red-500" />
              </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                <label htmlFor="dateFrom" className='text-sky-700 text-xl font-bold mb-1'>Date From:</label>
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
                <label htmlFor="reason" className='text-sky-700 text-xl font-bold mb-1'>Reason for the Trip:</label>
                <Field name="reason" as="textarea" className="textarea textarea-bordered bg-stone-100" />
                <ErrorMessage name="reason" component="div" className="text-red-500" />
              </div>
              <div className='flex gap-3 items-center'>
                <label htmlFor="notes" className='text-sky-700 text-xl font-bold mb-1'>Notes:</label>
                <Field name="notes" as="textarea" className="textarea textarea-bordered bg-stone-100" />
                <ErrorMessage name="notes" component="div" className="text-red-500" />
              </div>

              {/* Service Type */}
              <div className='flex gap-3 items-center'>
                <label htmlFor="serviceType" className='text-sky-700 text-xl font-bold mb-1'>Type of Service:</label>
                <Field name="serviceType" as="select" className="select select-bordered bg-stone-100">
                  <option value=""> Select Service Type </option>
                  <option value="personal">Personal</option>
                  <option value="official">Official</option>
                  <option value="emergency">Emergency</option>
                </Field>
                <ErrorMessage name="serviceType" component="div" className="text-red-500" />
              </div>

              {/* Submit Button */}
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
