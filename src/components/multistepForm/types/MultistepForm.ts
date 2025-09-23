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

export const defaultValues = {
  name: "",
  age: undefined,
  email: "",
  country: "",
  city: "",
  zip: "",
  contactMethod: "",
  subscribe: false,
  category: "",
};
