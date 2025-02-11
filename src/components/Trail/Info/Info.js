import React from 'react';
import { View } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { map } from "lodash";
import { Map } from '../../Shared/Map';
import { styles } from './Info.styles';

export function Info(props) {
    const { trail } = props;

    const listInfo = [
        {
            text: trail.address,
            iconType: "material-community",
            iconName: "map-marker",
        },
        {
            text: trail.phone,
            iconType: "material-community",
            iconName: "phone",
        },
        {
            text: trail.email,
            iconType: "material-community",
            iconName: "at",
        },
    ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el sendero</Text>
      <Map location={trail.location} name={trail.name} />
      {map(listInfo, (item, index) => (
        <ListItem ket={index} bottomDivider>
            <Icon type={item.iconType} name={item.iconName} color="#004F92" />
            <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}