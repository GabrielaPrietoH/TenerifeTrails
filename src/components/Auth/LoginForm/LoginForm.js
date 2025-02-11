import React, { useState } from 'react';
import { View } from 'react-native';
import{ Input, Icon, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils';
import { useNavigation } from '@react-navigation/native'
import { initialValues, validationSchema } from './LoginForm.data';
import { styles } from './LoginFrom.styles';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const onShowHidePassword = () => setShowPassword(prevState => !prevState);
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try{
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
                Toast.show({
                    type: 'success',
                    text1: 'Sesión iniciada',
                    text2: 'Bienvenido a la aplicación',
                });
                navigation.navigate(screen.account.account);
            } catch (error){
                Toast.show({
                    type: 'error',
                    text1: 'Usuario o contraseña incorrectos',
                    text2: 'Revise los datos e intente nuevamente',
                });
            };
        }
    });

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Correo Electrónico'
        containerStyle={styles.input}
        rightIcon={
            <Icon
              type='material-community'
              name='at'
              iconStyle={styles.icon}
            />
        }
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Contraseña'
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
            <Icon
             type='material-community'
             name={showPassword ? 'eye-off-outline' : 'eye-outline'}
             iconStyle={styles.icon}
             onPress={onShowHidePassword}
            />
        }
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        />
    </View>
  )
}