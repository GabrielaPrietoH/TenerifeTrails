import React from 'react';
import { ScrollView } from 'react-native';
import { Text , Button, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; 
import { screen } from '../../../utils';
import { styles } from './UserGuestScreen.styles';


export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () => { 
    navigation.navigate(screen.account.login);
  }
  return (
   <ScrollView centerContent={true} style={styles.content}> 
    <Image source={require('../../../../assets/img/user-guest.png')} style={styles.image} />
    <Text style={styles.title}>Consultar tu perfil de Tenerife Trails</Text>
    <Text style={styles.description}>
      ¿Cómo describirías tu mejor ruta? Busca y 
      visualiza las mejores rutas de montaña de una forma sencilla, 
      vota cuál te ha gustado más y comenta cómo ha sido tu experiencia.
      </Text>

      <Button title="Ver tu perfil" buttonStyle={styles.button} onPress={ goToLogin } />
   </ScrollView>
  )
}