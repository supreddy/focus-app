import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Formik, Field, Form } from 'formik';
import axios from "axios";
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
    const navigate = useNavigate();

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setFile] = useState('');
    const [USState, setStateValue] = useState('');

    const initialValues = {
        companyName: "",
        taxID: "",
        email: "",
        mobile: "",
        addressline1: "",
        city: "",
        postalcode: ""
    }

    const validateForm = (values) => {
        const errors = {};

        if (!values.companyName) {
            errors.companyName = "Company name is required";
        } else if (values.companyName.length <= 3) {
            errors.companyName = 'Must be 3 characters or more';
        }

        if (!values.taxID) {
            errors.taxID = "Last name is required";
        } else if (values.taxID.length <= 2) {
            errors.taxID = 'Must be 2 characters or more';
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.mobile) {
            errors.mobile = "Phone number is required";
        } else if (values.mobile.length <= 10) {
            errors.mobile = "Phone length must be more than 10"
        }

        if (!values.addressline1) {
            errors.addressline1 = "Address is required";
        } 

        if (!values.city) {
            errors.city = "City is required";
        } 

        if (!values.postalcode) {
            errors.postalcode = "ZIP is required";
        } 

        return errors;
    }

    // On file select (from the pop up)
    const onFileChange = (event) => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            event.target.files[0]
        );

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:1977/uploadlogo", formData)
        .then((response) => {
          // handle the response
          var urlparts = response.data.url.split('?');   
          if (urlparts.length >= 2) {
            console.log(urlparts[0]);
            setFile(urlparts[0]);
          }
          else
            console.log("Malformed URL");
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
    };

    const onSubmitProfileForm = async (values) => {
        setLoading(true);
        
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

        await callMyAPI("http://localhost:1977/companyprofile", dataToSend);
    }


return (
    <div className="flex flex-col max-w-[948px]">
      <div className='text-xs' style={{ color: "red" }}>
          {errors && errors}
      </div>
      <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={(values) => onSubmitProfileForm(values)}
      >
      {
          ({
              values,
              errors,
              touched,
              handleChange
          }) => (
              <Form className="space-y-6" >
            <div className="flex z-10 justify-center items-center px-16 py-11 w-full text-base bg-white rounded-lg border border-dashed border-neutral-300 text-zinc-700 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col mb-1.5 max-w-full w-[290px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5e21c3b08243fa99a8f5d913f0dfa31e731370fa0e2f549e58ae9eb4cddf710?apiKey=8dde510044754384984fc0e26caa54d2&"
                className="self-center w-6 aspect-square"
              />
              <div className="mt-4">Click here to upload your logo</div>
              <Field
                    type="file"
                    id="logo"
                    name="logo"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-5 py-2 text-white  placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={onFileChange}
                    value={values.logoUrl}
              />
            </div>
          </div>
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-10 max-md:flex-col ">
              <div className="flex flex-col w-6/12  max-md:w-full">
                <div className="flex flex-col grow justify-center text-xs text-stone-500 ">
                  <div className="flex flex-col mt-5">
                    <Field
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="Company name"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.companyName && touched.companyName && errors.companyName}
                    </p>                    
                  </div>
                  <div className="flex flex-col mt-5">
                    <Field
                        type="text"
                        id="taxID"
                        name="taxID"
                        value={values.taxID}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="TaxID"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.taxID && touched.taxID && errors.taxID}
                    </p>                    
                  </div>
                  <div className="flex flex-col mt-5">
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="Email address"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="flex flex-col mt-5">
                    <Field
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="mobile"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.mobile && touched.mobile && errors.mobile}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-6/12 max-md:w-full">
                <div className="flex flex-col grow justify-center text-xs text-stone-500  max-md:max-w-full">
                  <div className="flex flex-col mt-5 max-md:max-w-full">
                    <Field
                        type="text"
                        id="addressline1"
                        name="addressline1"
                        value={values.addressline1}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="Address Line 1"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.addressline1 && touched.addressline1 && errors.addressline1}
                    </p>
                  </div>
                  <div className="flex flex-col mt-5 max-md:max-w-full">
                    <Field
                        type="text"
                        id="city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="City"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.city && touched.city && errors.city}
                    </p>
                  </div>
                  <div className="flex flex-col mt-5 max-md:max-w-full">
                    <Field
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        value={values.postalcode}
                        onChange={handleChange}
                        className="flex flex-col justify-center p-4 text-base bg-white rounded-lg border border-solid border-stone-300"
                        placeholder="Postalcode"
                    />
                    <p className='text-xs' style={{ color: 'red' }}>
                        {errors.postalcode && touched.postalcode && errors.postalcode}
                    </p>
                  </div>
                  <div className="flex flex-col mt-5 justify-center text-base tracking-normal whitespace-nowrap bg-white rounded border border-green-600 border-solid shadow-sm text-neutral-700 max-md:max-w-full">
                      <p><SelectUSState id="myId" className="myClassName" onChange={setStateValue}/></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between self-center mt-4 max-w-full text-base leading-6 text-center whitespace-nowrap w-[401px]">
            <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            <span>
                {loading ? "Creating Account ..." : " Next"}
            </span>
            </button>
          </div>
      </Form>
      )
    }
    </Formik>
    </div>
  );
}

export default CompanyProfile