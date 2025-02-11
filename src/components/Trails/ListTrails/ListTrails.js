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
        navigation.navigate(screen.trail.trail, {id: trail.id });
    };

  return (
    <View>
      <FlatList
      data={trails}
      renderItem={(doc) => {
        const trail = doc.item.data();
        return (
            <TouchableOpacity onPress={() => {goToTrail(trail)}}>
                <View style={style.content}>
                    <Image source={{ uri: trail.images[0] }} style={style.image}/>
                    <View>
                        <Text style={style.name}>{trail.name}</Text>
                        <Text>{trail.address}</Text>
                        <Text style={style.description}>{trail.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
      }}
      />
    </View>
  )
}