import * as yup from 'yup'

export const registerValidateSchema = yup.object().shape({
    name: yup.string().required('Se necesita un nombre'),
    surname: yup.string().required('Se necesita tus apellidos'),
    email: yup.string().email('Correo no valido').required('Se necesita un correo'),
    username: yup.string().required('Se necesita un usuario'),
    password: yup.string().min(5,'Contraseña muy corta').required('se necesita una contraseña'),
    phone: yup.number().required('Se necesita un numero de telefono'),
    locality: yup.string().required('se necesita un direccion'),
    profilePicture: yup.string()
})