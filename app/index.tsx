
import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';



export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/telaDeCadastro/index')}>
        <Text style={styles.texto}>Tela de Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  texto: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },

});