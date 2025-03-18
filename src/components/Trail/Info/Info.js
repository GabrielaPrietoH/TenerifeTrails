import React from 'react';
import { View } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { Map } from '../../Shared/Map';
import { styles } from './Info.styles';

export function Info(props) {
  const { trail } = props;

  // Validación para evitar errores si `trail` es null o undefined
  if (!trail) return null;

  // Validar y formatear `trail.location` si es necesario
  const location = trail.location
    ? {
        latitude: trail.location.latitude || 0,
        longitude: trail.location.longitude || 0,
        latitudeDelta: 0.01, 
        longitudeDelta: 0.01,
      }
    : null;

  // Función para obtener el color y el texto de la dificultad
  const getDifficultyInfo = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'verde':
        return { text: 'Fácil', color: 'green' };
      case 'amarillo':
        return { text: 'Medio', color: 'yellow' };
      case 'rojo':
        return { text: 'Difícil', color: 'red' };
      default:
        return { text: 'Desconocido', color: '#004F92' }; 
    }
  };

  const difficultyInfo = getDifficultyInfo(trail.difficulty);

  const listInfo = [
    {
      text: trail.location.address,
      iconType: "material-community",
      iconName: "map-marker", 
    },
    {
      text: `${trail.distance} km`, 
      iconType: "material-community",
      iconName: "walk",
    },
    {
      text: difficultyInfo.text,
      iconType: "material-community",
      iconName: "terrain",
      color: difficultyInfo.color, 
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el sendero</Text>
      
      {location && (
        <Map location={location} name={trail.name} />
      )}

      {listInfo.map((item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon
            type={item.iconType}
            name={item.iconName}
            color={item.color || "#004F92"} 
          />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}