import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Image, Rating, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { styles } from './TrailsRanking.styles';

export function TrailsRanking(props) {
  const { trail, index } = props;
  const navigation = useNavigation(); 

  if (!trail) {
    return null;
  }

  const goToTrail = () => {
    navigation.navigate(screen.trail.tab, {
      screen: screen.trail.trail,
      params: {
        id: trail.id,
      },
    });
  };

  const goToAllReviews = () => {
    navigation.navigate(screen.trail.tab, {
      screen: screen.trail.reviews, 
      params: {
        reviews: trail.reviews, 
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Fecha no disponible";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const lastReview = trail.reviews && trail.reviews.length > 0 ? trail.reviews[trail.reviews.length - 1] : null;

  return (
    <TouchableOpacity onPress={goToTrail}>
      <View style={styles.content}>
        {trail.images && trail.images.length > 0 ? (
          <Image source={{ uri: trail.images[0] }} style={styles.image} />
        ) : (
          <View style={[styles.image, { backgroundColor: "#e0e0e0", justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: "#888" }}>Imagen no disponible</Text>
          </View>
        )}
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{trail.name || "Nombre no disponible"}</Text>
          </View>
          {trail.ratingMedia ? (
            <Rating
              imageSize={15}
              readonly
              startingValue={trail.ratingMedia}
            />
          ) : (
            <Text style={styles.description}>Sin calificación</Text>
          )}
        </View>
        <Text style={styles.description}>{trail.description || "Descripción no disponible"}</Text>
        
        {lastReview ? (
          <View style={styles.lastReviewContainer}>
            <Text style={styles.reviewTitle}>{lastReview.title || "Sin título"}</Text>
            <Text style={styles.reviewComment}>{lastReview.comment || "Sin comentario"}</Text>
            <Text style={styles.reviewRating}>Rating: {lastReview.rating || 0}</Text>
            <Text style={styles.reviewDate}>{formatDate(lastReview.createAt)}</Text>
          </View>
        ) : (
          <Text style={styles.noReviewsText}>No hay reseñas disponibles</Text>
        )}

        {trail.reviews && trail.reviews.length > 1 && (
          <TouchableOpacity onPress={goToAllReviews}>
            <Text style={styles.seeAllReviews}>Ver todas las reseñas</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}