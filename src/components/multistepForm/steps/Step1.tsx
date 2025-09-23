import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2 px-2 w-full">
      <label htmlFor="nameM" className="font-semibold">
        Name:
      </label>
      <input
        {...register("name")}
        placeholder="Name"
        className="border rounded-sm p-2 w-full"
        id="nameM"
      />
      <p className="text-red-500">{errors.name?.message as string}</p>

      <label htmlFor="numberM" className="font-semibold">
        Number:
      </label>
      <input
        type="number"
        {...register("age")}
        placeholder="Age"
        className="border rounded-sm p-2 w-full"
      />
      <p className="text-red-500">{errors.age?.message as string}</p>

      <label htmlFor="emailM" className="font-semibold">
        Email:
      </label>
      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="border rounded-sm p-2 w-full"
      />
      <p className="text-red-500">{errors.email?.message as string}</p>
    </div>
  );
};

export default Step1;
