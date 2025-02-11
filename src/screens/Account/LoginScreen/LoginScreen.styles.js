import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
       marginHorizontal: 40,
    },
    input: {
        marginBottom: 20,
    },
    image: {    
        resizeMode: 'contain',
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    button: {
        marginBottom: 20,
    },
    registerText: {
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerLink: {
        color: '#004F92',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
});