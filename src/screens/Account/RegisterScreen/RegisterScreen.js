import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegisterForm } from '../../../components/Auth';
import { styles } from './RegisterScreen.styles';


export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require('../../../../assets/img/logo-senderos.png')} style={styles.image} />
      <View style={styles.container}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}