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
function VacationForm() {
  const { empName } = UseEmpInformationStore();
  const { userData, fetchUser } = UseEmpInformationStore();
  useEffect(() => {
    fetchUser();
  }, []);
  const validationSchema = Yup.object({
    dateFrom: Yup.date().required('date from is required'),
    dateTo: Yup.date().required().min(Yup.ref('dateFrom'), 'End date cannot be before start date'),
    leavesType: Yup.string().required('Leave type is required'),
    notes: Yup.string().optional(),
    description: Yup.string().optional(),
    manager: Yup.string().required('Manager is required'),
    directManager: Yup.string().required('Direct Manager is required'),
  });
  return (
    <>
      <Toaster />
      <div className='bg-white'>
        <Title title='Vacation Request' />
        <hr className='opacity-25 border-gray-300' />
      </div>
      <OuterContainer>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
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
                const token = sessionStorage.getItem('token');
                const dataToSend = JSON.stringify({ data: { ...values, empName: empName, insertDate: new Date().toISOString().split('T')[0] } });
                try {
                  const res = await axios.post(`${endPoint}vacations`, dataToSend, {
                    headers: {
                      "Content-Type": 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  if (res.status === 200 || res.status === 201) {
                    toast.success('Vacation request submitted successfully!');
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
                    <h3 className="text-xl font-bold text-[var(--color-primary)] border-b border-sky-200 pb-2">Vacation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="dateFrom">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <Field name="dateFrom" type="date" className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"/>
                        <ErrorMessage name="dateFrom" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="dateTo">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <Field name="dateTo" type="date" className="w-full input input-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors"/>
                        <ErrorMessage name="dateTo" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700" htmlFor="leavesType">
                        Leave Type <span className="text-red-500">*</span>
                      </label>
                      <Field name="leavesType" as="select" className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors">
                        <option hidden>Select Leave Type</option>
                        <option value="annual vacation">Annual Vacation</option>
                        <option value="emergency vacation">Emergency Vacation</option>
                        <option value="rest day">Rest Days</option>
                      </Field>
                      <ErrorMessage name="leavesType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] border-b border-sky-200 pb-2">Additional Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="description">
                          Description
                        </label>
                        <Field name="description" as="textarea" rows={3} className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical"/>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="notes"> Notes </label>
                        <Field name="notes" as="textarea" rows={3} className="w-full textarea textarea-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors resize-vertical" />
                        <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] border-b border-sky-200 pb-2">Approvers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="directManager">
                          Direct Manager <span className="text-red-500">*</span>
                        </label>
                        <Field name="directManager" as="select" className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors">
                          <option hidden>Select Direct Manager</option>
                          <option value={userData?.[0]?.directManager}>{userData?.[0]?.directManager}</option>
                        </Field>
                        <ErrorMessage name="directManager" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="manager">
                          Manager <span className="text-red-500">*</span>
                        </label>
                        <Field name="manager" as="select" className="w-full select select-bordered bg-stone-100 border-gray-300 focus:border-sky-500 focus:bg-white transition-colors">
                          <option hidden>Select Manager</option>
                          <option value={userData?.[0]?.manager}>{userData?.[0]?.manager}</option>
                        </Field>
                        <ErrorMessage name="manager" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSubmitting} className="btn bg-[var(--color-primary)] hover:bg-sky-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]">
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

export default VacationForm


