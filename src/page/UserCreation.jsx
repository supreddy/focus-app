import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import { auth } from '../firebase';
import * as Yup from 'yup';



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

const UserCreation = () => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('');

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        designation: '',
        role:''
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile: Yup.string().required('Mobile is required')
    });

    const MultiSelect = ({field, form, options, isMulti = false, placeholder = 'Select'}) => {
        function onChange(option) {
            form.setFieldValue(
                field.name,
                option ? (option).map((item) => item.value) : [],
            );
            console.log(option);
            setRole(option);
        }
    
        const getValue = () => {
            if (options) {
                return isMulti
                    ? options.filter((option) => {console.log(field); if(option) {field.value.indexOf(option.value) >= 0}})
                    : options.find((option) => option.value === field.value);
            } else {
                return isMulti ? [] : ('');
            }
        };
    
        if (!isMulti) {
            return (
                <Select
                    options={options}
                    name={field.name}
                    value={options ? options.find(option => option.value === field.value) : ''}
                    onChange={(option) => form.setFieldValue(field.name, option.value)}
                    onBlur={field.onBlur}
                    placeholder={placeholder}
                />
            )
        } else {
            return (
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name={field.name}
                    value={getValue()}
                    onChange={onChange}
                    options={options}
                    isMulti={true}
                    placeholder={placeholder}
                />
            )
        }
    }

    const onSubmitUserForm = async (values, { setSubmitting }) => {
        setLoading(true);
        // Call your API here
                // Prepare the JSON with the values
        // and POST to the backend
        const dataToSend = {
            "firstname": values.firstname,
            "lastname": values.lastname,
            "email": values.email,
            "mobile": values.mobile,
            "role": role
          }
  
        await callMyAPI("https://blinkinvoice-backend.vercel.app/user", dataToSend);

        setSubmitting(false); 
    };

    return (
        <div className="max-w-auto mx-auto p-8  rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-zinc-400">Company Profile</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitUserForm}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-6">
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6">
                                {/* First Name */}
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-500">
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="First Name"
                                    />
                                    <ErrorMessage name="firstname" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-500">
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Last Name"
                                    />
                                    <ErrorMessage name="lastname" component="div" className="text-red-600 font-mono mr-2 mt-2" />
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
                                {/* Designation */}
                                <div>
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-500">
                                        Designation
                                    </label>
                                    <Field
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Designation"
                                    />
                                    <ErrorMessage name="designation" component="div" className="text-red-600 font-mono mr-2 mt-2" />
                                </div>
                                {/* Role */}
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-500">
                                        Role
                                    </label>
                                    <Field
                                        className="custom-select"
                                        name="role"
                                        options={[{label: "User", value: "User"},
                                          {label: "Finance", value: "finance"}]}
                                        component={MultiSelect}
                                        placeholder="Select role..."
                                        isMulti={true}
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
                                {loading ? 'Creating User ...' : 'Next'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserCreation;










