import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { 
  collection, 
  query,
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { map } from 'lodash';
import { TrailsRanking } from '../components/Trails';
import { db } from '../utils';

export function RankingScreen() {
  const [trails, setTrails] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "trails"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      setTrails(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(trails, (trail, index) => (
        <TrailsRanking
          key={index}
          index={index}
          trail={trail.data()}
        />
      ))}
    </ScrollView>
  );
}
