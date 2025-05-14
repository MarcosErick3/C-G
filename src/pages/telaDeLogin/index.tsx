// app/login/index.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import styles from './styles'

const schema = Yup.object().shape({
  usuario: Yup.string().required('Campo obrigatório'),
  senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
})

export default function Login() {
  const router = useRouter()
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Bem-Vindo</Text>

        <Formik
          initialValues={{ usuario: '', senha: '' }}
          validationSchema={schema}
          onSubmit={(values) => {
            // Aqui você pode fazer login com Firebase ou outro
            Alert.alert('Login feito com sucesso!', JSON.stringify(values, null, 2))
            console.log('Login feito com sucesso!', values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="Nome de usuário, e-mail ou número de celular"
                placeholderTextColor="#aaa"
                style={styles.input}
                onChangeText={handleChange('usuario')}
                onBlur={handleBlur('usuario')}
                value={values.usuario}
              />
              {touched.usuario && errors.usuario && (
                <Text style={styles.error}>{errors.usuario}</Text>
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

              <TouchableOpacity onPress={() => router.push('../telaDeCadastro/')}>
                <Text style={styles.cadastroText}>Não tem conta? Cadastre-se</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
}
