import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { screen, db } from '../../../utils'
import { size } from 'lodash';
import { styles } from './BtnReviewForm.styles';

export function BtnReviewForm(props) {
    const { idTrail } = props;
    const [hasLogged, setHasLogged] = useState(false);
    const [hasReview, setHasReview] = useState(false);
    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
     onAuthStateChanged(auth, (user) =>{
        setHasLogged(user ? true: false);
     });
    }, []);

    useEffect(() => {
      if(hasLogged) {
        const q = query(
          collection(db, "reviews"),
          where("idTrail", "==", idTrail),
          where("idUser", "==", auth.currentUser.uid)
        );

        onSnapshot(q, (snapshot) =>{
          if(size(snapshot.docs) > 0) setHasReview(true);
        });
      }
    }, [hasLogged]);
      
  

    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login,
        });
    };

    const goToAddReview = () => {
      navigation.navigate(screen.trail.addReviewTrail, {idTrail});
    };

    if(hasLogged && hasReview) {
      return(
        <View style={styles.content}>
        <Text style={styles.textSendReview}>Ya has comentado este sendero con anterioridad</Text>
      </View>
      );
    }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button 
         title="Escribe una opinión" 
         icon={{ 
             type: "material-community", 
             name: "square-edit-outline", 
             color: "#00a680",
         }} 
         buttonStyle={styles.buttom}
         titleStyle={styles.btnText}
         onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
            Para escribir una opinión es necesario estar logeado {" "}
            <Text style={styles.textClick}>pulsa AQUÍ para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
}