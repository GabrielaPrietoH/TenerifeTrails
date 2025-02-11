import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, AirbnbRating, ListItem, Avatar } from 'react-native-elements';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../../utils';
import { map } from 'lodash';
import { DateTime } from 'luxon';
import { Loading } from '../../Shared';
import { styles } from "./Reviews.styles";
import 'intl';
import 'intl/locale-data/jsonp/es';

export function Reviews(props) {
  const { idTrail } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idTrail", "==", idTrail),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });

  }, []);

  if(!reviews) return <Loading show text="Cargando" />

  return (
    <View style={styles.content}>
      {map(reviews, (reviews) =>{
        const data = reviews.data();
        const createReview = new Date(data.createAt.seconds * 1000)

        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title} </ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
              </View>
              <View style={styles.contentRatingDate}>
                <AirbnbRating 
                 defaultRating={data.rating} 
                 showRating={false} 
                 size={15} 
                 isDisabled 
                 starContainerStyle={styles.startContainer}
                />
                <Text style={styles.date}>{DateTime.fromISO(createReview.toISOString()).toFormat("yyyy/LL/dd - hh:mm")}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </View>
  )
}