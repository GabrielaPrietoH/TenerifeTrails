import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { size, map } from 'lodash';
import { db } from '../utils';
import { Loading } from '../components/Shared';
import { UserNotLogged, NotFoundTrails, TrailFavorite } from '../components/Favorites';

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [trails, setTrails] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);

      if (user) {
        const q = query(
          collection(db, "favorites"),
          where("idUser", "==", user.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, async (snapshot) => {
          let trailArray = [];
          for await (const item of snapshot.docs) {
            const data = item.data();
            const docRef = doc(db, "trails", data.idTrail);
            const docSnap = await getDoc(docRef);
            const newData = docSnap.data();
            newData.idFavorite = data.id;

            trailArray.push(newData);
          }

          setTrails(trailArray);
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribe();
  }, []);

  if (!hasLogged) return <UserNotLogged />;

  if (!trails) return <Loading show text="Cargando" />;

  if (size(trails) === 0) return <NotFoundTrails />;

  return (
    <ScrollView>
      {map(trails, (trail) => (
        <TrailFavorite key={trail.id} trail={trail} />
      ))}
    </ScrollView>
  );
}