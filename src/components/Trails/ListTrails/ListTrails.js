import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { style } from './ListTrails.styles';

export function ListTrails(props) {
  const { trails } = props;
  const navigation = useNavigation();

  const goToTrail = (trail) => {
    navigation.navigate(screen.trail.trail, { id: trail.id });
  };

  // Función para obtener el color de la dificultad
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'verde':
        return 'green';
      case 'amarillo':
        return 'yellow';
      case 'rojo':
        return 'red';
      default:
        return '#004F92'; 
    }
  };

  return (
    <View>
      <FlatList
        data={trails}
        renderItem={(doc) => {
          const trail = doc.item.data();
          const difficultyColor = getDifficultyColor(trail.difficulty) || '#004F92'; 

          return (
            <TouchableOpacity onPress={() => goToTrail(trail)}>
              <View style={style.card}>
                <View
                  style={[
                    style.imageWrapper,
                    { backgroundColor: difficultyColor },
                  ]}
                >
                  <Image source={{ uri: trail.images[0] }} style={style.image} />
                </View>
                <View style={style.infoContainer}>
                  <Text style={style.name}>{trail.name}</Text>
                  <Text style={style.address}>{trail.location.address}</Text>
                  <Text style={style.description} numberOfLines={2}>
                    {trail.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={style.separator} />} 
      />
    </View>
  );
}