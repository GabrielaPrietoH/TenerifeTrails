import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { InfoForm, UploadImageForm, ImageTrail } from '../../../components/Trails/AddTrail';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import { db } from '../../../utils';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { initialValues, validationSchema } from './AddTrailScreen.data';
import { styles } from './AddTrailScreen.styles';

export function AddTrailScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createAt = new Date();

        const myDb = doc(db, "trails", newData.id);
        await setDoc(myDb, newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      
      <ImageTrail formik={formik} />

      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button 
        title="Guardar Sendero" 
        buttonStyle={styles.addTrail}
        onPress={formik.handleSubmit} 
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )
}
