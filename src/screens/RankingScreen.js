import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { map, groupBy, meanBy } from 'lodash';
import { TrailsRanking } from '../components/Trails';
import { db } from '../utils';

export function RankingScreen({ navigation }) {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailsAndReviews = async () => {
      try {
        console.log("Fetching data from Firestore...");

        // Obtener todos los senderos
        const trailsQuery = query(collection(db, "trails"));
        const trailsSnapshot = await getDocs(trailsQuery);
        const trailsData = trailsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Obtener todas las reseñas
        const reviewsQuery = query(collection(db, "review"));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsData = reviewsSnapshot.docs.map((doc) => doc.data());
        const reviewsByTrail = groupBy(reviewsData, "idTrail");

        // Calcular el ratingMedia para cada sendero basado en las reseñas
        const trailsWithReviewsAndRating = trailsData.map((trail) => {
          const trailReviews = reviewsByTrail[trail.id] || [];
          const ratingMedia = trailReviews.length > 0 ? meanBy(trailReviews, "rating") : 0;

          return {
            ...trail,
            reviews: trailReviews,
            ratingMedia: ratingMedia,
          };
        });

        // Ordenar los senderos por ratingMedia de mayor a menor
        const sortedTrails = trailsWithReviewsAndRating.sort((a, b) => b.ratingMedia - a.ratingMedia);

        console.log("Sorted trails with reviews and rating:", sortedTrails);
        setTrails(sortedTrails);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailsAndReviews();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  }

  if (trails.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay senderos disponibles</Text>;
  }

  return (
    <ScrollView>
      {map(trails, (trail, index) => (
        <TrailsRanking
          key={trail.id}
          index={index}
          trail={trail}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}