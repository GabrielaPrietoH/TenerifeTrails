import React from 'react';
import { View } from 'react-native';
import { Text, Rating } from 'react-native-elements';
import { styles } from './Header.styles';

export function Header(props) {
  const { trail } = props;

  const ratingMedia = trail.ratingMedia || 0;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{trail.name}</Text>
        <Rating 
          imageSize={20} 
          readOnly 
          startingValue={ratingMedia} 
        />
      </View>
      <Text style={styles.description}>{trail.description}</Text>
    </View>
  );
}