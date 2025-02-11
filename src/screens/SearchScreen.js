import React, { useState, useEffect, use } from 'react';
import { View, ScrollView } from 'react-native';
import { SearchBar, ListItem, Avatar, Icon, Text } from 'react-native-elements';
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { size, map } from 'lodash';
import { Loading } from '../components/Shared';
import { screen } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { db } from '../utils';


export function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "trails"),
        orderBy("name"),
          startAt(searchText),
          endAt(`${searchText}\uf8ff`),
          limit(20)
      )

      const querySnapshot = await getDocs(q)
      setSearchResults(querySnapshot.docs)
    })()
  }, [searchText])

  const goToTrail = (idTrail) => {
    navigation.navigate(screen.trail.tab, {
      screen: screen.trail.trail,
      params: {
        id: idTrail,
      },
    });
  };

  return (
    <>
      <SearchBar
        placeholder='Busca tu Sendero'
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {!searchResults && <Loading show text="Cargando"/>}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20}}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data()

            return (
              <ListItem 
                key={data.id} 
                bottomDivider 
                onPress={() => goToTrail(data.id)}
              >
                <Avatar source={{ uri: data.images[0]}} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            )
          })
        )}
      </ScrollView>
    </>
  )
}