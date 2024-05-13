import * as Yup from "yup";

export const CompanyProfileSchema = Yup.object({
  companyName: Yup.string().min(2).required("Please enter your company name"),
  companyAddress: Yup.string().min(2).required("Please enter your company address"),
  industry: Yup.string().required("Please enter your industry"),
  companySize: Yup.string().required("Please enter your company size"),
  website: Yup.string().url().required("Please enter a valid website URL"),
  contactPerson: Yup.string().min(2).required("Please enter the contact person's name"),
  contactEmail: Yup.string().email().required("Please enter a valid email address for contact"),
  contactPhone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please enter a valid phone number"
    )
    .required("Please enter the contact phone number"),
});
