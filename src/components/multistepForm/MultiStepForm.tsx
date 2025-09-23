import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { stepSchemas } from "./schemas/StepSchemas";
import * as yup from "yup";

export type FormValues = {
  name: string;
  age: number;
  email: string;
  country: string;
  city: string;
  zip: string;
  contactMethod: string;
  subscribe: boolean;
  category: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const methods = useForm<FormValues>({
    resolver: yupResolver(stepSchemas[step] as yup.ObjectSchema<FormValues>),
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      country: "",
      city: "",
      zip: "",
      contactMethod: "",
      subscribe: false,
      category: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, register, trigger, watch, reset, formState: { errors }} = methods;

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data: FormValues) => {
    alert("Form submitted: " + JSON.stringify(data, null, 2));
    localStorage.removeItem("multiStepForm");
  };

  return (
    <section className="flex max-w-2xl bg-white rounded-2xl shadow-2xl py-4 px-2">
      <div className="w-1/3 py-3 pl-8 m-auto">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p>Get started in under 2 minutes.</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-6 space-y-4"
      >
        <h2 className="text-xl font-bold mb-2">Step {step + 1}</h2>

        {/* Step 1: Personal Info */}
        {step === 0 && (
          <div className="space-y-2 px-2">
            <label htmlFor="nameM" className="font-semibold">Name:</label>
            <input
                {...register("name")}
              placeholder="Name"
              className="border rounded-sm p-2 w-full"
              id="nameM"
            />
            <p className="text-red-500">{errors.name?.message}</p>

            <label htmlFor="nameM" className="font-semibold">Number:</label>
            <input
              type="number"
                {...register("age")}
              placeholder="Age"
              className="border p-2 w-full"
            />
            <p className="text-red-500">{errors.age?.message}</p>

            <label htmlFor="nameM" className="font-semibold">Email:</label>
            <input
              type="email"
                {...register("email")}
              placeholder="Email"
              className="border p-2 w-full"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            <input
              {...register("country")}
              placeholder="Country"
              className="border p-2 w-full"
            />
            <p className="text-red-500">{errors.country?.message}</p>

            <input
              {...register("city")}
              placeholder="City"
              className="border p-2 w-full"
            />
            <p className="text-red-500">{errors.city?.message}</p>

            <input
              {...register("zip")}
              placeholder="Zip Code"
              className="border p-2 w-full"
            />
            <p className="text-red-500">{errors.zip?.message}</p>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 2 && (
          <div className="space-y-2">
            <div>
              <label className="block">Preferred Contact:</label>
              <label>
                <input type="radio" value="Email" 
                {...register("contactMethod")}
                 /> Email
              </label>
              <label>
                <input type="radio" value="Phone" 
                {...register("contactMethod")} 
                /> Phone
              </label>
              <label>
                <input type="radio" value="WhatsApp" 
                {...register("contactMethod")} 
                /> WhatsApp
              </label>
              <p className="text-red-500">{errors.contactMethod?.message}</p>
            </div>

            <label className="block">
              <input type="checkbox" 
              {...register("subscribe")} 
              /> Subscribe to Newsletter
            </label>

            <select 
            {...register("category")} 
            className="border p-2 w-full">
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Art">Art</option>
              <option value="Travel">Travel</option>
            </select>
            <p className="text-red-500">{errors.category?.message}</p>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Review your data:</h3>
            <pre className="bg-gray-100 p-2 text-sm">
              {JSON.stringify(methods.getValues(), null, 2)}
            </pre>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default MultiStepForm;
