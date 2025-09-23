import { useFormContext } from "react-hook-form";

const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2 px-2 w-full">
      <div>
        <label className="block font-semibold pb-2">Preferred Contact:</label>
        <label>
          <input type="radio" value="Email" {...register("contactMethod")} className="mr-2" />
          Email
        </label>
        <label>
          <input type="radio" value="Phone" {...register("contactMethod")} className="ml-2"/>{" "}
          Phone
        </label>
        <label>
          <input type="radio" value="WhatsApp" {...register("contactMethod")} className="ml-2 pb-2"/>{" "}
          WhatsApp
        </label>
        <p className="text-red-500">{errors.contactMethod?.message as string}</p>
      </div>

      <label className="block py-2">
        <input type="checkbox" {...register("subscribe")} /> Subscribe to
        Newsletter
      </label>

        <label className="font-semibold">Select a topic: </label>
      <select {...register("category")} className="border p-2 w-full">
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Art">Art</option>
        <option value="Travel">Travel</option>
      </select>
      <p className="text-red-500">{errors.category?.message as string}</p>
    </div>
  );
};

export default Step3;
