'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function VacationForm() {
  const validationSchema = Yup.object({
    dateFrom: Yup.date().required(),
    dateTo: Yup.date().required(),
    type: Yup.string().required(),
    notes: Yup.string(),
    description: Yup.string(),
    manager: Yup.string().required(),
    directManager: Yup.string().required(),
  });
  return (
    <>
      <Formik
        initialValues={{
          dateFrom: '',
          dateTo: '',
          type: '',
          notes: '',
          description: '',
          manager: '',
          directManager: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form Submitted:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 p-6 bg-white rounded shadow-md">
            <div>
              <span>employee name :</span>
            </div>

            <div className="flex md:flex-row flex-col justify-between gap-3">
              <div className='flex gap-3'>
                <label htmlFor="dateFrom">from</label>
                <Field name="dateFrom" type="date" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="dateFrom" component="div" className="text-red-500" />
              </div>

              <div className='flex gap-3'>
                <label htmlFor="dateTo">to</label>
                <Field name="dateTo" type="date" className="input input-bordered bg-stone-100" />
                <ErrorMessage name="dateTo" component="div" className="text-red-500" />
              </div>
            </div>

            <div className='flex gap-3'>
              <label htmlFor="type">type</label>
              <Field name="type" as="select" className="select select-bordered bg-stone-100">
                <option value="Annual">Annual vacations</option>
                <option value="monthly">Emergency Leave</option>
                <option value="Weekly">rest days</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500" />
            </div>

            <div className='flex gap-3'>
              <label htmlFor="notes">notes</label>
              <Field name="notes" as="textarea" className="textarea textarea-bordered bg-stone-100" />
            </div>

            <div className='flex gap-3'>
              <label htmlFor="description">description</label>
              <Field name="description" as="textarea" className="textarea textarea-bordered bg-stone-100" />
            </div>

            <div className='flex gap-3'>
              <label htmlFor="directManager">direct manager</label>
              <Field name="directManager" as="select" className="select select-bordered bg-stone-100">
                <option value="Annual">Annual</option>
                <option value="monthly">monthly</option>
                <option value="Weekly">Weekly</option>
                <option value=""></option>
              </Field>
              <ErrorMessage name="manager" component="div" className="text-red-500" />
            </div>
            <div className='flex gap-3'>
              <label htmlFor="manager"> manager</label>
              <Field name="manager" as="select" className="select select-bordered bg-stone-100">
                <option value="Annual">Annual</option>
                <option value="monthly">monthly</option>
                <option value="Weekly">Weekly</option>
                <option value=""></option>
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
    </>
  )
}

export default VacationForm