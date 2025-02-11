import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { LoadingModal } from '../../../components/Shared';
import { ListTrails } from '../../../components/Trails';
import { screen, db } from "../../../utils";
import { styles } from './TrailsScreen.styles';

export function TrailsScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [trails, setTrails] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "trails"),
    orderBy("createAt", "desc")
  );

    onSnapshot(q, (snapshot) =>{
      setTrails(snapshot.docs);
    });
  }, []);

  const goToTrail = () => { 
    navigation.navigate(screen.trail.tab, {screen: screen.trail.addTrail});
  };

  return (
    <View style={styles.content}>
      {! trails ? (
        <LoadingModal show text= "Cargando" />
      ) : (
        <ListTrails trails={trails} />
      )}
        {currentUser && (
          <Icon 
          reverse 
          type="material-community" 
          name="plus" 
          color="#004F92" 
          containerStyle={styles.btnContainer} 
          onPress={goToTrail} 
          />
        )}
    </View>
  );

}
