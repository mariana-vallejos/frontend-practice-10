import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types/MultistepForm";

const Step4 = () => {
  const { watch } = useFormContext<FormValues>();
  const values = watch();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Review your data:</h3>
      <pre className="bg-gray-100 p-2 text-sm">
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
};

export default Step4;
