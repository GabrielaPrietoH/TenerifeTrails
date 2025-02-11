import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { MapForm } from '../MapForm';
import { styles } from './InfoForm.styles';

export function InfoForm(props) {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del sendero"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />

        <Input
          placeholder="Ubicación del sendero"
          rightIcon={{
            type: 'material-community',
            name: 'map-marker-radius',
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
          onChangeText={(text) => formik.setFieldValue("location", text)}
          errorMessage={formik.errors.location}
        />

        <Input
          placeholder="Distancia (km)"
          keyboardType="numeric"
          onChangeText={(text) => formik.setFieldValue("distance", text)}
          errorMessage={formik.errors.distance}
        />

        <Input
          placeholder="Dificultad (verde, amarillo, rojo)"
          onChangeText={(text) => formik.setFieldValue("difficulty", text)}
          errorMessage={formik.errors.difficulty}
        />

        <Input
          placeholder="Descripción del sendero"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000"; 
  if (formik.values.location) return "#00a680"; 
  return "#c2c2c2"; 
};