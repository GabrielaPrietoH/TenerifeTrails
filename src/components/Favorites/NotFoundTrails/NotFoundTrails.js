import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { styles } from './NotFoundTrails.styles';

export function NotFoundTrails() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>No tienes senderos en tu lista</Text>
    </View>
  )
}