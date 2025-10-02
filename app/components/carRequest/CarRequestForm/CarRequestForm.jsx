'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { endPoint, useApisStore } from '@/app/store/UseApisStore';
import axios from 'axios';
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import OuterContainer from '../../common/OuterContainer';
import Title from '../../common/Title';
import { useEffect } from 'react';

function CarRequestForm() {
  const { empName } = UseEmpInformationStore();
  const { emp, fetchApi } = useApisStore();
  useEffect(() => {
    fetchApi();
  }, []);
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
  const drivers = emp.filter(ele => ele.jobTitle.toLowerCase() === 'driver');
  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='Car Request' />
        <hr className='opacity-25 border-gray-300' />
      </div>
      <OuterContainer>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <Formik
              initialValues={{
                driverName: '',
                numberOfPassengers: '',
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
                const token = sessionStorage.getItem('token');
                const dataToSend = JSON.stringify({
                  data: {
                    ...values,
                    insertDate:  new Date().toISOString().split('T')[0],
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
                  if (res.status === 200 || res.status === 201) {
                    toast.success('Car request submitted successfully!');
                    resetForm();
                  }
                } catch (error) {
                  toast.error('Failed to send request. Please try again.');
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
                      <span className="text-(--color-primary) font-bold">{empName}</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <label className="text-sm font-medium text-gray-700">Insert Date:</label>
                      <span className="text-(--color-primary) font-bold">{new Date().toISOString().split('T')[0]}</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-(--color-primary) border-b border-sky-200 pb-2">Car Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="driverName">
                          Driver <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="driverName"
                          as="select"
                          className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                        >
                          <option hidden>Choose Driver</option>
                          {
                            drivers.map((ele) => (
                              <option key={ele.id} value={ele.fullName}>{ele.fullName}</option>
                            ))
                          }
                        </Field>
                        <ErrorMessage name="driverName" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="numberOfPassengers">
                          Number of Passengers <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="numberOfPassengers"
                          type="number"
                          min="1"
                          max="20"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                        />
                        <ErrorMessage name="numberOfPassengers" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700" htmlFor="carType">
                        Car Type <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="carType"
                        as="select"
                        className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                      >
                        <option hidden>Select Car Type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="van">Van</option>
                        <option value="pickup truck">Pickup Truck</option>
                        <option value="truck">Truck</option>
                      </Field>
                      <ErrorMessage name="carType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

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
                        <option value="hr">HR</option>
                        <option value="procurement and supply">Procurement and Supply</option>
                        <option value="operation">Operation</option>
                        <option value="transportation">Transportation</option>
                      </Field>
                      <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-(--color-primary) border-b border-sky-200 pb-2">Trip Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="yourLocation">
                          Your Location <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="yourLocation"
                          type="text"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                          placeholder="Enter your current location"
                        />
                        <ErrorMessage name="yourLocation" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="destination">
                          Destination <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="destination"
                          type="text"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                          placeholder="Enter destination"
                        />
                        <ErrorMessage name="destination" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="dateFrom">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="dateFrom"
                          type="date"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                        />
                        <ErrorMessage name="dateFrom" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="dateTo">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="dateTo"
                          type="date"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                        />
                        <ErrorMessage name="dateTo" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-(--color-primary) border-b border-sky-200 pb-2">Additional Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="reason">
                          Reason <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="reason"
                          as="textarea"
                          rows={3}
                          className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                          placeholder="Describe the reason for the request"
                        />
                        <ErrorMessage name="reason" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="notes">
                          Notes
                        </label>
                        <Field
                          name="notes"
                          as="textarea"
                          rows={3}
                          className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                          placeholder="Any additional notes (optional)"
                        />
                        <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-(--color-primary) hover:bg-sky-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
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

export default CarRequestForm;