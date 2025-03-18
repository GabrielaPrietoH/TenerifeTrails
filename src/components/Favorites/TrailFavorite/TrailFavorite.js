import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Icon, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, screen } from '../../../utils';
import { styles } from './TrailFavorite.styles';

export function TrailFavorite(props) {
  const { trail } = props;
  const navigation = useNavigation();

  // Función para navegar a la pantalla de información del sendero
  const goToTrail = () => {
    navigation.navigate(screen.trail.tab, {
      screen: screen.trail.trail, 
      params: {
        id: trail.id, 
      },
    });
  };

  // Función para eliminar un sendero de favoritos
  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", trail.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToTrail}>
      <View style={styles.content}>
        <Image source={{ uri: trail.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{trail.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}