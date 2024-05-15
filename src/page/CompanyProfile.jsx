import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { auth } from '../firebase';
import * as Yup from 'yup';
import SelectUSState from 'react-select-us-states';

async function callMyAPI(url, dataToSend) {
  const token = await auth.currentUser.getIdToken()

  console.log("Token : ", token);
  // Write Axios Request here
  // Add the authorization header here
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  axios.post(url, dataToSend, config)
  .then((response) => {
    // handle the response
      console.log(response);
  })
  .catch((error) => {
    // handle errors
    console.log(error);
  });
}

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
        postalcode: Yup.string().required('Postalcode is required')
    });

    const onFileChange = async (event) => {
        const formData = new FormData();
        formData.append('myFile', event.target.files[0]);
        try {
            const response = await axios.post('https://blinkinvoice-backend.vercel.app/uploadlogo', formData);
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
                // Prepare the JSON with the values
        // and POST to the backend
        const dataToSend = {
            "companyName": values.companyName,
            "taxID": values.taxID,
            "email": values.email,
            "mobile": values.mobile,
            "addressline1": values.addressline1,
            "city": values.city,
            "postalcode": values.postalcode,
            "USstate": USState,
            "logoUrl": selectedFile
          }
  
        await callMyAPI("https://blinkinvoice-backend.vercel.app/companyprofile", dataToSend);

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










