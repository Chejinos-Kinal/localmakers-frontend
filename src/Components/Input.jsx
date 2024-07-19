import { useField } from 'formik';
import { Text,StyleSheet } from 'react-native';
import React from 'react'
import StyledTextInput from '../pages/User/UserPage/StyleInput';

const Input = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const styles = StyleSheet.create({
        
        error: {
          color: 'red',
          fontSize: 12,
          marginBottom: 20,
          marginTop: -5
        }
      });
    return (
      <>
        <StyledTextInput
          error={meta.error}
          value={field.value}
          onChangeText={value => helpers.setValue(value)}
          {...props}
        />
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </>
    );

    
}

export default Input
