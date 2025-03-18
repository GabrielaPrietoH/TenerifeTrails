import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { doc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { CarouselComponent, Loading } from '../../../components/Shared';
import { Header, Info, BtnReviewForm, Reviews, BtnFavorite } from '../../../components/Trail';
import { db } from '../../../utils';
import { styles } from './TrailScreen.styles';
import { meanBy } from 'lodash';

const { width } = Dimensions.get("window");

export function TrailScreen(props) {
  const { route } = props;
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailAndReviews = async () => {
      try {
        setLoading(true);

        // Obtener el sendero
        const trailDoc = doc(db, "trails", route.params.id);
        const trailUnsubscribe = onSnapshot(trailDoc, (doc) => {
          const trailData = doc.data();
          setTrail(trailData);
        });

        // Obtener las reseñas asociadas al sendero
        const reviewsQuery = query(collection(db, "review"), where("idTrail", "==", route.params.id));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsData = reviewsSnapshot.docs.map((doc) => doc.data());

        // Calcular el ratingMedia
        const ratingMedia = reviewsData.length > 0 ? meanBy(reviewsData, "rating") : 0;

        // Actualizar el estado del sendero con el ratingMedia calculado
        setTrail((prevTrail) => ({
          ...prevTrail,
          ratingMedia: ratingMedia,
        }));
      } catch (error) {
        console.error("Error fetching trail and reviews: ", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailAndReviews();
  }, [route.params.id]);

  if (loading) {
    return <Loading show text="Cargando Senderos" />;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  }

  if (!trail) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No se encontró el sendero</Text>;
  }

  return (
    <ScrollView style={styles.content}>
      <CarouselComponent arrayImages={trail.images} width={width} height={250} hideDots />
      <Header trail={trail} />
      <Info trail={trail} />
      <BtnReviewForm idTrail={route.params.id} />
      <Reviews idTrail={route.params.id} />
      <BtnFavorite idTrail={route.params.id} />
    </ScrollView>
  );
}