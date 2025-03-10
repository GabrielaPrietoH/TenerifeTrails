import React from 'react';
import { View } from 'react-native';
import { Text, Rating } from 'react-native-elements';
import { styles } from './Header.styles';

export function Header(props) {
  const { trail } = props;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{trail.name}</Text>
        <Rating imageSize={20} readOnly startingValue={trail.ratingMedia | 0} />
      </View>
      <Text style={styles.description}>{trail.description}</Text>
    </View>
  )
}