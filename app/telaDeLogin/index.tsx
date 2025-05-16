// app/telaDeLogin/index.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import styles from './styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../DB/fireBase'  

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: Yup.string().required('Campo obrigatório')
})

export default function Login() {
  const router = useRouter()

  const handleLogin = async (values: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.senha)
      Alert.alert('Login feito com sucesso!')
      router.push('/layout') 
    } catch (error: any) {
      console.log('Erro ao logar:', error.message)
      Alert.alert('Erro', 'Email ou senha inválidos.')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Login</Text>

        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={schema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#aaa"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
              />
              {touched.senha && errors.senha && (
                <Text style={styles.error}>{errors.senha}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/telaDeCadastro')}>
                <Text style={styles.cadastroText}>Não tem conta? Cadastre-se</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
}
