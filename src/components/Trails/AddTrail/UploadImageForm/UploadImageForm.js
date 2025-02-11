import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Icon, Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { map, filter } from 'lodash';
import { LoadingModal } from '../../../Shared';
import { styles } from './UploadImageForm.styles';
import { appId } from '../../../../utils/firebase';

export function UploadImageForm(props) {
  const { formik } = props;
  const [isLoading, setIsLoading] = useState(false);


  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permisos necesarios", "Se necesita acceso a la galería para subir imágenes.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
      console.log("URI de la imagen seleccionada:", result.assets[0].uri); 
      uploadImage(result.assets[0].uri);
    } else {
      console.error("No se pudo obtener la URI de la imagen seleccionada.");
    }
  };

  const uploadImage = async (uri) => {
    setIsLoading(true);

    try {
      // Verificar si el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error("El archivo no existe.");
      }

      // Convertir la URI en un blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      // Subir el blob a Firebase Storage
      const storage = getStorage(appId);
      const storageRef = ref(storage, `restaurants/${uuid()}`);
      await uploadBytes(storageRef, blob);

      const imageUrl = await getDownloadURL(storageRef);
      console.log("URL de la imagen subida:", imageUrl);

      formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar una imagen de la lista
  const removeImage = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(formik.values.images, (image) => image !== img);
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  );
}