import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Overlay, Text } from 'react-native-elements'
import { styles } from './LoadingModal.style'

export function LoadingModal(props) {
  const { show, text } = props;

  return (
    <Overlay 
      isVisible={show} 
      windowBackgroundColor="rgba(0, 0, 0, 0.5)" 
      overlayBackgroundColor="transparent"
     overlayStyle={styles.overlay}
    > 
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#0000ff" />
        {text && <Text style={styles.text} >{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false
};