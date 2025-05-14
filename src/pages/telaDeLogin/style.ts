import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        paddingHorizontal: 24,
        width: '100%',
        height: '100%',
    },
    inner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        padding: 14,
        color: '#fff',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    cadastroText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    error: {
        color: '#FF3B30',
        fontSize: 12,
        marginBottom: 5,
    },
})

export default styles;
