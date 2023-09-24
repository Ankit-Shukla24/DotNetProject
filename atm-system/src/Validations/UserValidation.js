import * as yup from 'yup';

export const  UserSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(4).max(10).required()
})