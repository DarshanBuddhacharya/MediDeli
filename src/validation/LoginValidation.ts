import * as Yup from "yup";

export const PhoneValidation = Yup.string()
    .min(10, "Phone number is too short - should be 10 chars minimum.")
    .required("Required field");
export const emailValidation = Yup.string()
    .email("Please enter a valid email")
    .required("Required field");

export const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

export const loginFormSchema = Yup.object().shape({
    username: emailValidation,
    password: passwordValidate,
});
