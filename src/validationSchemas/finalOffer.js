import * as yup from 'yup'

export const finalOfferValidateSchema = yup.object().shape({
    price: yup.number('Tiene que ser un numero').required('Tienes que poner un precio'),
})