// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { auth } from '../firebase';
// import { Formik, Field, Form } from 'formik';
// import axios from "axios";
// import SelectUSState from 'react-select-us-states';

// async function callMyAPI(url, dataToSend) {
//   const token = await auth.currentUser.getIdToken()

//   console.log("Token : ", token);
//   // Write Axios Request here
//   // Add the authorization header here
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

//   axios.post(url, dataToSend, config)
//   .then((response) => {
//     // handle the response
//       console.log(response);
//   })
//   .catch((error) => {
//     // handle errors
//     console.log(error);
//   });
// }

// const CompanyProfile = () => {
//     const navigate = useNavigate();

//     const [errors, setErrors] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [selectedFile, setFile] = useState('');
//     const [USState, setStateValue] = useState('');

//     const initialValues = {
//         companyName: "",
//         taxID: "",
//         email: "",
//         mobile: "",
//         addressline1: "",
//         city: "",
//         postalcode: ""
//     }

//     const validateForm = (values) => {
//         const errors = {};

//         if (!values.companyName) {
//             errors.companyName = "Company name is required";
//         } else if (values.companyName.length <= 3) {
//             errors.companyName = 'Must be 3 characters or more';
//         }

//         if (!values.taxID) {
//             errors.taxID = "Last name is required";
//         } else if (values.taxID.length <= 2) {
//             errors.taxID = 'Must be 2 characters or more';
//         }

//         if (!values.email) {
//             errors.email = "Email is required";
//         } else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//             errors.email = "Invalid email address";
//         }

//         if (!values.mobile) {
//             errors.mobile = "Phone number is required";
//         } else if (values.mobile.length <= 10) {
//             errors.mobile = "Phone length must be more than 10"
//         }

//         if (!values.addressline1) {
//             errors.addressline1 = "Address is required";
//         } 

//         if (!values.city) {
//             errors.city = "City is required";
//         } 

//         if (!values.postalcode) {
//             errors.postalcode = "ZIP is required";
//         } 

//         return errors;
//     }

//     // On file select (from the pop up)
//     const onFileChange = (event) => {
//         // Create an object of formData
//         const formData = new FormData();

//         // Update the formData object
//         formData.append(
//             "myFile",
//             event.target.files[0]
//         );

//         // Request made to the backend api
//         // Send formData object
//         axios.post("http://localhost:1977/uploadlogo", formData)
//         .then((response) => {
//           // handle the response
//           var urlparts = response.data.url.split('?');   
//           if (urlparts.length >= 2) {
//             console.log(urlparts[0]);
//             setFile(urlparts[0]);
//           }
//           else
//             console.log("Malformed URL");
//         })
//         .catch((error) => {
//           // handle errors
//           console.log(error);
//         });
//     };

//     const onSubmitProfileForm = async (values) => {
//         setLoading(true);
        
//         // Prepare the JSON with the values
//         // and POST to the backend
//         const dataToSend = {
//           "companyName": values.companyName,
//           "taxID": values.taxID,
//           "email": values.email,
//           "mobile": values.mobile,
//           "addressline1": values.addressline1,
//           "city": values.city,
//           "postalcode": values.postalcode,
//           "USstate": USState,
//           "logoUrl": selectedFile
//         }

//         await callMyAPI("http://localhost:1977/companyprofile", dataToSend);
//     }


// return (
//     <div className="flex flex-col max-w-[948px]">
//       <div className='text-xs' style={{ color: "red" }}>
//           {errors && errors}
//       </div>
//       <Formik
//           initialValues={initialValues}
//           validate={validateForm}
//           onSubmit={(values) => onSubmitProfileForm(values)}
//       >
//       {
//           ({
//               values,
//               errors,
//               touched,
//               handleChange
//           }) => (
//               <Form className="space-y-6" >
//             <div className="flex z-10 justify-center items-center px-16 py-11 w-full text-base bg-white rounded-lg border border-dashed border-neutral-300 text-zinc-700 max-md:px-5 max-md:max-w-full">
//             <div className="flex flex-col mb-1.5 max-w-full w-[290px]">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5e21c3b08243fa99a8f5d913f0dfa31e731370fa0e2f549e58ae9eb4cddf710?apiKey=8dde510044754384984fc0e26caa54d2&"
//                 className="self-center w-6 aspect-square"
//               />
//               <div className="mt-4">Click here to upload your logo</div>
//               <Field
//                     type="file"
//                     id="logo"
//                     name="logo"
//                     className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-5 py-2 text-white  placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     onChange={onFileChange}
//                     value={values.logoUrl}
//               />
//             </div>
//           </div>
//           <div className="w-full max-md:max-w-full">
//             <div className="flex gap-10 max-md:flex-col ">
//               <div className="flex flex-col w-6/12  max-md:w-full">
//                 <div className="flex flex-col grow justify-center text-xs text-stone-500 ">
//                   <div className="flex flex-col mt-5">
//                     <Field
//                         type="text"
//                         id="companyName"
//                         name="companyName"
//                         value={values.companyName}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="Company name"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.companyName && touched.companyName && errors.companyName}
//                     </p>                    
//                   </div>
//                   <div className="flex flex-col mt-5">
//                     <Field
//                         type="text"
//                         id="taxID"
//                         name="taxID"
//                         value={values.taxID}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="TaxID"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.taxID && touched.taxID && errors.taxID}
//                     </p>                    
//                   </div>
//                   <div className="flex flex-col mt-5">
//                     <Field
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={values.email}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="Email address"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.email && touched.email && errors.email}
//                     </p>
//                   </div>
//                   <div className="flex flex-col mt-5">
//                     <Field
//                         type="text"
//                         id="mobile"
//                         name="mobile"
//                         value={values.mobile}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="mobile"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.mobile && touched.mobile && errors.mobile}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col w-6/12 max-md:w-full">
//                 <div className="flex flex-col grow justify-center text-xs text-stone-500  max-md:max-w-full">
//                   <div className="flex flex-col mt-5 max-md:max-w-full">
//                     <Field
//                         type="text"
//                         id="addressline1"
//                         name="addressline1"
//                         value={values.addressline1}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="Address Line 1"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.addressline1 && touched.addressline1 && errors.addressline1}
//                     </p>
//                   </div>
//                   <div className="flex flex-col mt-5 max-md:max-w-full">
//                     <Field
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={values.city}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="City"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.city && touched.city && errors.city}
//                     </p>
//                   </div>
//                   <div className="flex flex-col mt-5 max-md:max-w-full">
//                     <Field
//                         type="text"
//                         id="postalcode"
//                         name="postalcode"
//                         value={values.postalcode}
//                         onChange={handleChange}
//                         className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
//                         placeholder="Postalcode"
//                     />
//                     <p className='text-xs' style={{ color: 'red' }}>
//                         {errors.postalcode && touched.postalcode && errors.postalcode}
//                     </p>
//                   </div>
//                   <div className="flex flex-col mt-5 justify-center text-base tracking-normal whitespace-nowrap bg-white rounded border border-green-600 border-solid shadow-sm text-neutral-700 max-md:max-w-full">
//                       <p><SelectUSState id="myId" className="myClassName" onChange={setStateValue}/></p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-5 justify-between self-center mt-4 max-w-full text-base leading-6 text-center whitespace-nowrap w-[401px]">
//             <button
//                 type="submit"
//                 className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//             <span>
//                 {loading ? "Creating Account ..." : " Next"}
//             </span>
//             </button>
//           </div>
//       </Form>
//       )
//     }
//     </Formik>
//     </div>
//   );
// }

// export default CompanyProfile

// for now commented the code above

import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import SelectUSState from 'react-select-us-states';
import { CompanyProfileSchema } from '../components/schemas/Schema';

const CompanyProfile = () => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [USState, setUSState] = useState('');

    const initialValues = {
        companyName: '',
        taxID: '',
        email: '',
        mobile: '',
        addressline1: '',
        city: '',
        postalcode: '',
        USstate: '',
        logoUrl: '',
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required('Company Name is required'),
        taxID: Yup.string().required('Tax ID is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile: Yup.string().required('Mobile is required'),
        addressline1: Yup.string().required('Address Line 1 is required'),
        city: Yup.string().required('City is required'),
        postalcode: Yup.string().required('Postalcode is required'),
        USstate: Yup.string().required('State is required'),
        logo: Yup.string(),
    });

    const onFileChange = async (event) => {
        const formData = new FormData();
        formData.append('myFile', event.target.files[0]);
        try {
            const response = await axios.post('http://localhost:1977/uploadlogo', formData);
            var urlparts = response.data.url.split('?');
            if (urlparts.length >= 2) {
                setSelectedFile(urlparts[0]);
            } else {
                console.log('Malformed URL');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitProfileForm = async (values, { setSubmitting }) => {
        setLoading(true);
        // Call your API here
        setSubmitting(false); 
    };

    return (
        <div className="max-w-auto mx-auto p-8  rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-zinc-400">Company Profile</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitProfileForm}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-6">
                        <div className="border border-slate-400 rounded-lg p-6">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-500 mb-2">
                                Upload Company Logo
                            </label>
                            <div className="flex justify-center items-center">
                                <input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    className="hidden"
                                    onChange={onFileChange}
                                    value={selectedFile}
                                />
                                <label
                                    htmlFor="logo"
                                    className="cursor-pointer border border-dashed border-gray-400 rounded-lg p-4"
                                >
                                    <svg
                                        className="w-8 h-8 mx-auto mb-2 text-gray-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 5v7m0 0v7m0-7h7m-7 0H5" />
                                    </svg>
                                    <span className="text-gray-400">Choose a file</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6">
                                {/* Company Name */}
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-500">
                                        Company Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Company Name"
                                    />
                                    <ErrorMessage name="companyName" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Tax ID */}
                                <div>
                                    <label htmlFor="taxID" className="block text-sm font-medium text-gray-500">
                                        Tax ID
                                    </label>
                                    <Field
                                        type="text"
                                        id="taxID"
                                        name="taxID"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Tax ID"
                                    />
                                    <ErrorMessage name="taxID" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Mobile */}
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-500">
                                        Mobile
                                    </label>
                                    <Field
                                        type="text"
                                        id="mobile"
                                        name="mobile"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Mobile"
                                    />
                                    <ErrorMessage name="mobile" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Address Line 1 */}
                                <div>
                                    <label htmlFor="addressline1" className="block text-sm font-medium text-gray-500">
                                        Address Line 1
                                    </label>
                                    <Field
                                        type="text"
                                        id="addressline1"
                                        name="addressline1"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Address Line 1"
                                    />
                                    <ErrorMessage name="addressline1" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* City */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-500">
                                        City
                                    </label>
                                    <Field
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="City"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Postalcode */}
                                <div>
                                    <label htmlFor="postalcode" className="block text-sm font-medium text-gray-500">
                                        Postalcode
                                    </label>
                                    <Field
                                        type="text"
                                        id="postalcode"
                                        name="postalcode"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Postalcode"
                                    />
                                    <ErrorMessage name="postalcode" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* State */}
                                <div>
                                    <label htmlFor="USstate" className="block text-sm font-medium text-gray-500">
                                        State
                                    </label>
                                    <SelectUSState
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={USState}
                                        onChange={(value) => setUSState(value)}
                                    />
                                    <ErrorMessage name="USstate" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isSubmitting}
                            >
                                {loading ? 'Creating Account ...' : 'Next'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CompanyProfile;










