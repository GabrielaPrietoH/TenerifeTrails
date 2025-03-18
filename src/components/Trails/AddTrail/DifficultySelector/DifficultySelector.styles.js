import { StyleSheet } from 'react-native';

export { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    text: {
      color: '#000000',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    difficultyButton: {
      width: 50,
      height: 50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#c2c2c2',
    },
    selectedButton: {
        borderColor: '#000000',
    },
});
