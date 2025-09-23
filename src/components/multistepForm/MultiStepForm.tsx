import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { stepSchemas } from "./schemas/StepSchemas";
import * as yup from "yup";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import { defaultValues, type FormValues } from "./types/MultistepForm";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const methods = useForm<FormValues>({
    resolver: yupResolver(stepSchemas[step] as yup.ObjectSchema<FormValues>),
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, trigger, watch, reset } = methods;

  useEffect(() => {
    const saved = localStorage.getItem("multiStepForm");
    if (saved) {
      reset(JSON.parse(saved));
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("multiStepForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data: FormValues) => {
    alert("Form submitted: " + JSON.stringify(data, null, 2));
    localStorage.removeItem("multiStepForm");
    reset(defaultValues);
    setStep(0);
  };

  return (
    <section className="flex max-w-2xl bg-white rounded-2xl shadow-2xl py-4 px-2 max-h-3xl">
      <div className="w-1/3 py-3 pl-8 m-auto">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p>Get started in under 2 minutes.</p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto p-6 space-y-4"
        >
          <h2 className="text-xl font-bold mb-2">Step {step + 1}</h2>

          {/* Step 1: Personal Info */}
          {step === 0 && <Step1 />}
          {/* step 2: address  */}
          {step === 1 && <Step2 />}
          {/* Step 3: Preferences */}
          {step === 2 && <Step3 />}
          {/* Step 4: Review */}
          {step === 3 && <Step4 />}

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
      </FormProvider>
    </section>
  );
};

export default MultiStepForm;
