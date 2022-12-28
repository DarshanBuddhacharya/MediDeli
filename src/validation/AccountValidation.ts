import * as Yup from 'yup'
import { getMaximumDate, getMinimumDate } from '../../utils/dobUtil';

export const EmailValidation = Yup.string().email()
    .required('Required field');

export const genderValidate = Yup.string().required("A radio option is required")

export const DateValidation = Yup.date()
    .typeError("please enter a valid date")
    .required()
    .max(getMinimumDate(), "User must be 16 years or older")

export const accountFormSchema = Yup.object().shape({
    email: EmailValidation,
    gender: genderValidate,
    date_of_birth: DateValidation
})