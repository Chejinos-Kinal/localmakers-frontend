import { Formik } from 'formik'
import React from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Input from '../../Components/Input'
import { registerValidateSchema } from '../../validationSchemas/register'
import { registerRequest } from '../../services/user.services'
import { useNavigate } from 'react-router-native'

const Register = () => {
    const initialValues = {
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        phone: '',
        locality: '',
        profilePicture: ''
    }
    const styles = StyleSheet.create({
        form: {
            margin: 12
        }
    })

    const navigate = useNavigate()

    const registro = async (values) => {
        try {
            await registerRequest(values)
            navigate('/*')
      
        } catch (error) {
            console.error('Error al registrarse')
        }
    }

    return (
        <Formik
            validationSchema={registerValidateSchema}
            initialValues={initialValues}
            onSubmit={values => registro(values)}
        >
            {({ handleSubmit }) => (
                <View styles={styles.form} >
                    <Input
                        placeholder='nombre'
                        name='name'
                    />
                    <Input
                        placeholder='apellido'
                        name='surname'
                    />
                    <Input
                        placeholder='email'
                        name='email'
                    />
                    <Input
                        placeholder='usuario'
                        name='username'
                    />
                    <Input
                        placeholder='contraseña'
                        name='password'
                    /><Input
                        placeholder='telefono'
                        name='phone'
                    />
                    <Input
                        placeholder='direccion'
                        name='locality'
                    />
                    <Input
                        placeholder='ruta de la imagen'
                        name='profilePicture'
                    />
                    <Button onPress={handleSubmit} title='Registrarse' />
                </View>
            )}

        </Formik>
    )
}

export default Register
