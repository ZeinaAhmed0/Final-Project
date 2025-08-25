'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function ReservationRequest(){
    return(
        <>
        </>
    )
}





// const validationSchema = Yup.object({
//     employee: Yup.string().required(),
//     dateFrom: Yup.date().required(),
//     dateTo: Yup.date().required(),
//     type: Yup.string().required(),
//     notes: Yup.string(),
//     description: Yup.string(),
//     manager: Yup.string().required(),
// });

// export default function EmployeeForm() {
//     return (
//         <Formik
//             initialValues={{
//                 employee: '',
//                 dateFrom: '',
//                 dateTo: '',
//                 type: '',
//                 notes: '',
//                 description: '',
//                 manager: '',
//             }}
//             validationSchema={validationSchema}
//             onSubmit={(values, { setSubmitting }) => {
//                 console.log('Form Submitted:', values);
//                 setSubmitting(false);
//             }}
//         >
//             {({ isSubmitting }) => (
//                 <Form className="space-y-4 p-6 bg-white rounded shadow-md">
//                     <div>
//                         <label>employee/label>
//                         <Field name="employee" type="text" className="input input-bordered w-full" />
//                         <ErrorMessage name="employee" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                         <label>from/label>
//                         <Field name="dateFrom" type="date" className="input input-bordered w-full" />
//                         <ErrorMessage name="dateFrom" component="div" className="text-red-500" />
//                     </div>
//                     <div>
//                         <label>to/label>
//                         <Field name="dateTo" type="date" className="input input-bordered w-full" />
//                         <ErrorMessage name="dateTo" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                         <label>tyre</label>
//                         <Field name="type" as="select" className="select select-bordered w-full">
//                             <option value="'></option>
//                             <option value="'></option>
//                             <option value="'></option>
//                             <option value="'></option>
//                         </Field>
//                         <ErrorMessage name="type" component="div" className="text-red-500" />
//                     </div>

//                     <div>
//                         <label>notes/label>
//                         <Field name="notes" as="textarea" className="textarea textarea-bordered w-full" />
//                     </div>

//                     <div>
//                         <label>description/label>
//                         <Field name="description" as="textarea" className="textarea textarea-bordered w-full" />
//                     </div>

//                     <div>
//                         <label>manager<label>
//                         <Field name="manager" type="text" className="input input-bordered w-full" />
//                         <ErrorMessage name="manager" component="div" className="text-red-500" />
//                     </div>

//                     <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">Submit</button>
//                 </Form>
//             )}
//         </Formik>
//     );
// }