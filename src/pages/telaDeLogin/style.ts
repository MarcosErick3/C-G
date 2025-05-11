import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    text: {
        fontSize: 50,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 150,
    },
    boxTop: {
        height: 200,
        backgroundColor: 'red',
        width: '100%',
    },

    boxMid: {
      height: 200,
        backgroundColor: 'blue',
        width: '100%',
        marginTop: 20,
    },

    boxBottom: {
        marginTop: 20,
        backgroundColor: '',
    },
});