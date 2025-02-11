import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text, Rating, Icon } from 'react-native-elements'; 
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { styles } from './TrailsRanking.styles';

export function TrailsRanking(props) {
  const { trail, index } = props;
  const navigation = useNavigation();

  const goToTrail = () => {
    navigation.navigate(screen.trail.tab, {
      screen: screen.trail.trail,
      params: {
        id: trail.id,
      },
    });
  };

  const renderMedal = () => {
    if(index > 2) return null;

    let color = "";
    if(index === 0) color = "#FFD700";
    if(index === 1) color = "#BEBEBE";
    if(index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToTrail}>
      <View style={styles.content}>
        <Image source={{ uri: trail.images[0]}} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{trail.name}</Text>
          </View>
          <Rating 
          imageSize={15} 
          readonly
          startingValue={trail.ratingMedia}
        />
        </View>
        <Text style={styles.description}>{trail.description}</Text>
      </View>
    </TouchableOpacity>
  )
}