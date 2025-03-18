import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { MapForm } from '../MapForm';
import { styles } from './InfoForm.styles';
import { DifficultySelector } from '../DifficultySelector';

export function InfoForm(props) {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del sendero"
          onChangeText={(text) => formik.setFieldValue('name', text)}
          value={formik.values.name}
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
          value={formik.values.location?.address || ''} // Mostrar la dirección si existe
          editable={false}
          errorMessage={formik.errors.location}
          inputStyle={{
            color: formik.values.location ? '#00a680' : '#ff0000', // Verde si hay ubicación, rojo si no
          }}
        />

        <Input
          placeholder="Distancia (km)"
          keyboardType="numeric"
          onChangeText={(text) => formik.setFieldValue('distance', text)}
          value={formik.values.distance}
          errorMessage={formik.errors.distance}
        />

        <DifficultySelector
          selectedDifficulty={formik.values.difficulty}
          onSelectDifficulty={(value) => formik.setFieldValue('difficulty', value)}
        />
        {formik.errors.difficulty && (
          <Text style={{ color: '#ff0000', marginLeft: 10 }}>
            {formik.errors.difficulty}
          </Text>
        )}

        <Input
          placeholder="Descripción del sendero"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue('description', text)}
          value={formik.values.description}
          errorMessage={formik.errors.description}
        />
      </View>

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) return '#ff0000';
  if (formik.values.location) return '#00a680';
  return '#c2c2c2';
};