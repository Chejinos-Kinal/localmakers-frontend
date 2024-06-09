import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    username: yup
    .string()
    .required('se necesita el usuario'),
    password : yup.string().min(5,'Contraseña muy pequeña').required('se necesita la contraseña')
})