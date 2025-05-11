
import { StyleSheet, View, Text } from 'react-native';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Home Screen</Text>
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
  },
});
