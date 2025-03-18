import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { Modal } from '../../../Shared';
import { styles } from './MapForm.styles';

export function MapForm({ show, close, formik }) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para obtener la dirección a partir de las coordenadas
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const { street, city, region, country } = address[0];
        return `${street ? street + ', ' : ''}${city ? city + ', ' : ''}${region ? region + ', ' : ''}${country}`;
      }
      return 'Ubicación desconocida';
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return 'Error al obtener la dirección';
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      try {
        // Verificar si los servicios de ubicación están activados
        const { locationServicesEnabled } = await Location.getProviderStatusAsync();
        if (!locationServicesEnabled) {
          setError(new Error('Los servicios de ubicación están desactivados.'));
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'Habilita los servicios de ubicación en los ajustes del dispositivo.',
          });
          setIsLoading(false);
          return;
        }

        // Solicitar permisos de ubicación
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError(new Error('Permisos de localización no otorgados'));
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'Habilita la localización en los ajustes de la aplicación.',
          });
          setIsLoading(false);
          return;
        }

        // Obtener la ubicación actual
        const locationTemp = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 15000,
        });
        console.log('Ubicación obtenida:', locationTemp);

        setLocation({
          latitude: locationTemp.coords.latitude,
          longitude: locationTemp.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        setError(error);
        let errorMessage = 'Error al obtener la ubicación';
        if (error.code === 'CANCELLED') {
          errorMessage = 'La solicitud de ubicación fue cancelada.';
        } else if (error.code === 'UNAVAILABLE') {
          errorMessage = 'Los servicios de ubicación no están disponibles.';
        }
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (show) {
      getLocation();
    }
  }, [show]);

  // Función para guardar la ubicación y la dirección
  const saveLocation = async () => {
    if (location) {
      const address = await getAddressFromCoordinates(location.latitude, location.longitude);
      formik.setFieldValue('location', {
        latitude: location.latitude,
        longitude: location.longitude,
        address, // Guardar la dirección en formik
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

  // Función para actualizar la ubicación cuando el usuario mueve el Marker
  const handleMarkerDragEnd = (e) => {
    const newLocation = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setLocation(newLocation);
  };

  return (
    <Modal show={show} close={close}>
      {isLoading ? (
        <View style={styles.mapFallback}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.fallbackText}>Cargando ubicación...</Text>
        </View>
      ) : error ? (
        <View style={styles.mapFallback}>
          <Text style={styles.fallbackText}>Error: {error.message}</Text>
        </View>
      ) : location ? (
        <MapView
          style={styles.mapStyles}
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
            onDragEnd={handleMarkerDragEnd}
          />
        </MapView>
      ) : (
        <View style={styles.mapFallback}>
          <Text style={styles.fallbackText}>No se pudo obtener la ubicación.</Text>
        </View>
      )}

      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          onPress={saveLocation}
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          disabled={!location || isLoading}
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