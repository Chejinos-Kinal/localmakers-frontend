import React from 'react'
import { Formik, useField } from 'formik'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import StyledTextInput from './StyleInput'
import { loginValidationSchema } from '../../validationSchemas/login'

const Login = () => {
    const initValues = {
        username: '',
        password: ''
    }

    const styles = StyleSheet.create({
        form: {
            margin: 12
        },
        error:{
            color:'red',
            fontSize:12,
            marginBottom: 20,
            marginTop:-5
        }
    })


    const FormikInputValue = ({ name, ...props }) => {
        const [field, meta, helpers] = useField(name)
        return (
            <>
            <StyledTextInput
                error={meta.error}
                value={field.value}
                onChangeText={value => helpers.setValue(value)}
                {...props}
            ></StyledTextInput>
                {meta.error && <Text style={styles.error} >{meta.error} </Text>}
            </>
        )
    }



  
    return (
        <Formik validationSchema={loginValidationSchema} initialValues={initValues} onSubmit={values => console.log(values)} >
            {({ handleSubmit }) => {
                return (
                    <View style={styles.form} >
                        <FormikInputValue
                            placeholder='Username'
                            name='username'
                        >
                        </FormikInputValue>
                        <FormikInputValue
                            placeholder='password'
                            name='password'
                            secureTextEntry
                        >
                        </FormikInputValue>
                        <Button onPress={handleSubmit} title='Log In'> </Button>
                    </View>

                )

            }}
        </Formik>
    )
}

export default Login
