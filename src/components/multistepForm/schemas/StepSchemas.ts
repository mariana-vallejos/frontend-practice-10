import * as yup from "yup";

export const stepSchemas = [
  yup.object({
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .min(14, "Minimum age is 14")
      .required("Age is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  }),
  yup.object({
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    zip: yup
      .string()
      .matches(/^\d{5}$/, "Zip must be a valid 5-digit code")
      .required("Zip code is required"),
  }),
  yup.object({
    contactMethod: yup.string().required("Choose a contact method"),
    subscribe: yup.boolean(),
    category: yup
      .string()
      .required("Select a category"),
  }),
  yup.object(),
];