import React from "react";

import {
    Text,
    View
} from 'react-native';

import { styles } from "./style";
import { Button } from "@react-navigation/elements";

export default function TelaDeLogin() {
    return (
        
        <View style={styles.container}>
            <Text style={styles.text}>Bem vindo</Text>
            <View style={styles.boxTop}>
                <Text>CPF</Text>
            </View>
            <View style={styles.boxMid}>
                <Text>Senha:</Text>
            </View>
            <View style={styles.boxBottom}>
                <Button>Entrar</Button>
            </View>
        </View>
    )
}