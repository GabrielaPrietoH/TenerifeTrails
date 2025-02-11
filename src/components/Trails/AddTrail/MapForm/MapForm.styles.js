import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mapStyles: {
        width: "100%",
        height: 550,
    },
    mapFallback: {
      width: '100%',
      height: 400,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    fallbackText: {
      color: '#555',
      fontSize: 16,
    },
    mapActions: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    btnMapContainerSave: {
      paddingRight: 5,
      width: "50%"
    },
    btnMapSave: {
      backgroundColor: "#00a680",
    },
    btnMapContainerCancel: {
      paddingLeft: 5,
      width: "50%"
    },
    btnMapCancel: {
      backgroundColor: "#a60d0d"
    },
    mapWebContainer: {
      width: '100%',
      height: 400, // Definir un tamaño adecuado para el mapa
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    mapContainer: {
      width: '100%',
      height: 400, // Definir un tamaño adecuado para el WebView
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
});
