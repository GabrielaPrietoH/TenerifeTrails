import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initialValues, validationSchema} from './RegisterForm.data';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils';
import { styles } from './RegisterForm.styles';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try{
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al registrar usuario'
        });
      }
    },
  });

  const showHidenPassword = () => { setShowPassword((prevState) => !prevState);}

  return (
    <View style={styles.container}>
      <Input 
      placeholder='Correo electrónico' 
      containerStyle={styles.input} 
      rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>}
      onChangeText={text => formik.setFieldValue('email', text)} 
      errorMessage={formik.errors.email}
       />
      <Input 
      placeholder='Contraseña' 
      containerStyle={styles.input} 
      rightIcon={
        <Icon 
          type='material-community' 
          name={showPassword ? "eye-off-outline" : "eye-outline"} 
          iconStyle={styles.icon}
          onPress={showHidenPassword}
          />
      } 
      secureTextEntry={showPassword ? false : true} 
      onChangeText={text => formik.setFieldValue('password', text)}
      errorMessage={formik.errors.password}
      />
      <Input
      placeholder='Repetir contraseña'
      containerStyle={styles.input} 
      rightIcon={
        <Icon
          type='material-community'
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          iconStyle={styles.icon}
          onPress={showHidenPassword}
        />
      } 
      secureTextEntry={showPassword ? false : true}  
      onChangeText={text => formik.setFieldValue('repeatPassword', text)}
      errorMessage={formik.errors.repeatPassword}
      />
      <Button title='Registrarse' 
      containerStyle={styles.btnContainer} 
      buttonStyle={styles.btn} 
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </View>
  )
}