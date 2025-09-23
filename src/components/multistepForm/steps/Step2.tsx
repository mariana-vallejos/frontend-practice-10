import { useFormContext } from "react-hook-form";

const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  
  return (
    <div className="space-y-2 px-2 w-full">
      <label htmlFor="countryM" className="font-semibold">
        Country:
      </label>
      <input
        {...register("country")}
        placeholder="Country"
        className="border rounded-sm p-2 w-full"
      />
      <p className="text-red-500">{errors.country?.message as string}</p>

      <label htmlFor="cityM" className="font-semibold">
        City:
      </label>
      <input
        {...register("city")}
        placeholder="City"
        className="border rounded-sm p-2 w-full"
      />
      <p className="text-red-500">{errors.city?.message as string}</p>

      <label htmlFor="codezipM" className="font-semibold">
        Codezip:
      </label>
      <input
        {...register("zip")}
        placeholder="Zip Code"
        className="border rounded-sm p-2 w-full"
        id="codezipM"
      />
      <p className="text-red-500">{errors.zip?.message as string}</p>
    </div>
  );
};

export default Step2;
