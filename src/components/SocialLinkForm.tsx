import { useForm, useFieldArray } from "react-hook-form";

type SocialLink = {
  platform: string;
  url: string;
};

type FormValues = {
  socialLinks: SocialLink[];
};

const platforms = [
  "Twitter",
  "Facebook",
  "LinkedIn",
  "Instagram",
  "GitHub",
  "Tiktok",
];

export default function SocialLinksForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      socialLinks: [{ platform: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-8 shadow rounded-lg bg-amber-100 max-w-lg mx-auto my-10"
    >
      <h2 className="text-xl font-semibold">Social Media Links</h2>

      {fields.map((field, index) => (
        <div key={field.id}>
          <div
            className="flex bg-white gap-2 border p-2 rounded"
          >
            <select
              {...register(`socialLinks.${index}.platform`, {
                required: "Platform is required",
              })}
              className="border p-1 rounded"
            >
              <option value="">Select platform</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <input
              type="url"
              placeholder="https://example.com"
              {...register(`socialLinks.${index}.url`, {
                required: "URL is required",
                pattern: {
                  value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                  message: "Enter a valid URL",
                },
              })}
              className="flex-1 border p-1 rounded"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
          <div>
            {errors.socialLinks?.[index]?.url && (
              <span className="text-red-500 text-sm mr-2">
                {errors.socialLinks[index]?.url?.message}.
              </span>
            )}
            {errors.socialLinks?.[index]?.platform && (
              <span className="text-red-500 text-sm">
                {errors.socialLinks[index]?.platform?.message}
              </span>
            )}
          </div>
        </div>
      ))}

      {fields.length < 5 && (
        <button
          type="button"
          onClick={() => append({ platform: "", url: "" })}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Link
        </button>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded ml-4"
      >
        Submit
      </button>
    </form>
  );
}
