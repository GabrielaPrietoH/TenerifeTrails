import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styles } from './infoUser.styles';
import { appId } from '../../../utils/firebase';

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Estado del permiso:", status);

    if (status !== 'granted') {
      Alert.alert("Permisos necesarios", "Se necesita acceso a la galería para cambiar el avatar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log("Resultado de la selección de imagen:", result);

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
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage(appId);
      const storageRef = ref(storage, `avatar/${uid}`);
      await uploadBytes(storageRef, blob);

      const imageUrl = await getDownloadURL(storageRef);

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
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>

      <View style={styles.content}>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}