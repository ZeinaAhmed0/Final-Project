'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CarRequestForm() {
  const validationSchema = Yup.object({
    type: Yup.string().required(),
    notes: Yup.string(),
    number: Yup.number().required(),
  });
  return (
    <>
          <Formik
            initialValues={{
              type: '',
              notes: '',
              number: '',
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
                  <label htmlFor="dateFrom">date of request :</label>
                  <Field type="date" value={new Date().toISOString().split('T')[0]} />
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
                  <label htmlFor="number">driver's number</label>
                  <Field name="number" as="select" className="select select-bordered bg-stone-100" />
                </div>

                <div className='flex gap-3'>
                  <label htmlFor="directManager">Verified by</label>
                  <Field name="directManager" as="select" className="select select-bordered bg-stone-100">
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

export default CarRequestForm