import { useFormik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import RatingComponent from "./RatingComponent";
import { useState } from "react";

interface FormValues {
    name: string;
    rating: number;
    message: string;
}

const initialValues: FormValues = {
    name: '',
    rating: 0,
    message: ''
};

const RatingFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
    rating: Yup.number()
        .min(1, 'Please rate between 1 and 5')
        .max(5, 'Please rate between 1 and 5')
        .required('Rating is required'),
    message: Yup.string().when("rating", {
        is: (val: number) => val < 3,
        then: (schema) => schema.required("Message is required when rating is less than 3"),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const RatingForm = () => {
    const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema: RatingFormSchema,
        onSubmit: (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
            setSubmittedData(values);
            resetForm();
        },
    });

    return (
        <section className="flex p-10 gap-4 mx-10">
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-1/2 px-5">
                <h3 className="text-2xl font-bold">Rating form</h3>

                <div className="flex gap-2 items-center py-2">
                    <label htmlFor="nameRatingForm" className="font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="nameRatingForm"
                        className="border my-2 rounded px-2"
                        placeholder="Introduce your name here"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                )}

                <div className="py-2">
                    <RatingComponent setRating={(val) => formik.setFieldValue("rating", val)} rating={formik.values.rating} />
                </div>
                {formik.touched.rating && formik.errors.rating && (
                    <div className="text-red-500 text-sm">{formik.errors.rating}</div>
                )}

                <div className="flex gap-2 py-2">
                    <label htmlFor="messageRatingForm" className="font-semibold">Message:</label>
                    <textarea
                        name="message"
                        id="messageRatingForm"
                        className="border rounded w-2/3"
                        rows={5}
                        placeholder="Write your message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    ></textarea>
                </div>
                {formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm">{formik.errors.message}</div>
                )}

                <div className="mx-auto py-3">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                </div>
            </form>

            <div className="w-1/2 px-5">
                <h4 className="text-xl font-semibold">Information submitted:</h4>
                {submittedData ? (
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[400px]">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                ) : (
                    <p className="text-gray-500">No data submitted yet.</p>
                )}
            </div>
        </section>
    );
};

export default RatingForm;
