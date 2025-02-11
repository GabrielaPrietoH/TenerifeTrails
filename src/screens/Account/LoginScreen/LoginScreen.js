import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from '../../../components/Auth';
import { screen } from '../../../utils';
import { styles } from './LoginScreen.styles';

export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () => { 
    navigation.navigate(screen.account.register);
  }

  return (
    <ScrollView>
      <Image source={require('../../../../assets/img/logo-senderos.png')} style={styles.image} />
      <View style={styles.container}>
        <LoginForm />
        <Text style={styles.registerText}>
          ¿Aún no tienes una cuenta?{' '}
          <Text style={styles.registerLink} onPress={goToRegister}>Regístrate</Text>
        </Text> 
      </View>
    </ScrollView>
  );
}