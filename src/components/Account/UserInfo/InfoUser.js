import React, { useState } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styles } from './infoUser.styles';
import { appId } from '../../../utils/firebase';

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const openGallery = async () => {
    // Verificar y solicitar permisos en API 30+
    if (Platform.OS === 'android' && Platform.Version >= 30) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permisos necesarios", "Se necesita acceso a la galería para cambiar el avatar.");
        return;
      }
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
    setLoadingText("Actualizando Avatar");
    setLoading(true);

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
      const storageRef = ref(storage, `avatar/${uid}`);
      await uploadBytes(storageRef, blob);

      const imageUrl = await getDownloadURL(storageRef);
      console.log("URL de la imagen subida:", imageUrl);

      // Actualizar el perfil del usuario con la nueva URL del avatar
      const auth = getAuth();
      await updateProfile(auth.currentUser, { photoURL: imageUrl });

      setAvatar(imageUrl);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      Alert.alert("Error", "No se pudo actualizar el avatar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={openGallery} />
      </Avatar>

      <View style={styles.content}>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}