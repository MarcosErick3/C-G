import React from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, View } from 'react-native';
import TelaDeLogin from '@/src/pages/telaDeLogin';

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TelaDeLogin/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});