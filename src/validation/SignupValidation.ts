import * as Yup from 'yup'

export const FullNameValidation = Yup.string()
    .min(2, 'Username is too short - should be 6 chars minimum.')
    .required('Required field');

export const PhoneValidation = Yup.string()
    .min(10, 'Phone number is incorrect - should be 10 chars.')
    .required('Required field');

export const passwordValidate = Yup.string()
    .required('Required field')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.');

export const SignupFormSchema = Yup.object().shape({
    full_name: FullNameValidation,
    phone: PhoneValidation,
    password: passwordValidate,
})