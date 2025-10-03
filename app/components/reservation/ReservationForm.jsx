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
  const { empName , fetchUser} = UseEmpInformationStore();
  useEffect(() => {
    fetchUser ();
  }, []);

  const validationSchema = Yup.object({
    visitStation: Yup.string().required(' Visit station is required'),
    accommodationPlace: Yup.string().required('Accommodation place is required'),
    purposeOfStay: Yup.string().required('purpose of stay is required'),
    notes: Yup.string().optional(),
  });
  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='Reservation Request' />
        <hr className='opacity-25 border-gray-300' />
      </div>
      <OuterContainer>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <Formik
              initialValues={{
                visitStation: '',
                accommodationPlace: '',
                purposeOfStay: '',
                notes: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const token = sessionStorage.getItem('token');
                const dataToSend = JSON.stringify({ 
                  data: { 
                    ...values, 
                    empName: empName, 
                    insertDate: new Date().toISOString().split('T')[0]
                  } 
                });
                try {
                  const res = await axios.post(`${endPoint}reservations`, dataToSend, {
                    headers: {
                      "Content-Type": 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  if (res.status === 200 || res.status === 201) {
                    toast.success('Reservation request submitted successfully!');
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
                      <span className="text-[var(--color-primary)] font-bold">{empName}</span>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <label className="text-sm font-medium text-gray-700">Insert Date:</label>
                      <span className="text-[var(--color-primary)] font-bold">{new Date().toISOString().split('T')[0]}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] border-b border-sky-200 pb-2">Reservation Details</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="visitStation">
                          Visit Station <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="visitStation"
                          type="text"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                          placeholder="Enter visit station"
                        />
                        <ErrorMessage name="visitStation" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="accommodationPlace">
                          Accommodation Place <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="accommodationPlace"
                          type="text"
                          className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"
                          placeholder="Enter accommodation place"
                        />
                        <ErrorMessage name="accommodationPlace" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] border-b border-sky-200 pb-2">Additional Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="purposeOfStay">
                          Purpose of Stay <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="purposeOfStay"
                          as="textarea"
                          rows={3}
                          className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"
                          placeholder="Describe the purpose of the stay"
                        />
                        <ErrorMessage name="purposeOfStay" component="div" className="text-red-500 text-sm mt-1" />
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
                        />
                        <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-[var(--color-primary)] hover:bg-sky-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
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

export default ReservationForm