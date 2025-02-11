import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { Modal } from '../../../Shared';
import { styles } from './MapForm.styles';

export function MapForm({ show, close, formik }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'Habilita la localización en los ajustes de la aplicación.',
          });
          return;
        }

        const locationTemp = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationTemp.coords.latitude,
          longitude: locationTemp.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        setError(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al obtener la ubicación',
          text2: error.message,
        });
      }
    };

    if (show) {
      getLocation();
    }
  }, [show]);

  const saveLocation = () => {
    if (location) {
      formik.setFieldValue('location', {
        latitude: location.latitude,
        longitude: location.longitude,
      });
      close();
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No se ha seleccionado una ubicación válida.',
      });
    }
  };

  return (
    <Modal show={show} close={close}>
      {error ? (
        <View>
          <Text>Error: {error.message}</Text>
        </View>
      ) : location ? (
        <MapView
          style={{ width: '100%', height: 400, borderRadius: 10 }}
          initialRegion={location}
          region={location}
          onRegionChangeComplete={(region) => setLocation(region)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable
            onDragEnd={(e) =>
              setLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              })
            }
          />
        </MapView>
      ) : (
        <Text>Cargando mapa...</Text>
      )}

      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          onPress={saveLocation}
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
        />
        <Button
          title="Cerrar"
          onPress={close}
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
        />
      </View>
    </Modal>
  );
}