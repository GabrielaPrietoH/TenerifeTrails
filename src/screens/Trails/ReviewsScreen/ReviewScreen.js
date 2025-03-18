import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './ReviewsScreen.style';

export function ReviewScreen() {
  const route = useRoute();
  const { reviews } = route.params; 

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Fecha no disponible";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewTitle}>{item.title || "Sin título"}</Text>
      <Text style={styles.reviewComment}>{item.comment || "Sin comentario"}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating || 0}</Text>
      <Text style={styles.reviewDate}>{formatDate(item.createAt)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}