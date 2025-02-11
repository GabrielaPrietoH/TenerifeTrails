import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore';
import { CarouselComponent, Loading } from '../../../components/Shared';
import { Header, Info, BtnReviewForm, Reviews, BtnFavorite } from '../../../components/Trails';
import { db } from '../../../utils';
import { styles } from './TrailScreen.styles';

const { width } = Dimensions.get("window")

export function TrailScreen(props) {
    const { route } = props;
    const [trail, setTrail] = useState(null);

    useEffect(() => {
        setTrail(null);
        onSnapshot(doc(db, "trails", route.params.id), (doc) => {
            setTrail(doc.data());
        })
    }, [route.params.id]);

    if (!trail) return <Loading show text="Cargando Senderos"/>;

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