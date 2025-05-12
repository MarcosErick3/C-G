// app/cadastro.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './style'; 

const schema = Yup.object().shape({
  usuario: Yup.string().required('Campo obrigatório'),
  senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
})

export default function Cadastro() {
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
            Alert.alert('Cadastro realizado!', JSON.stringify(values, null, 2))
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
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <Text style={styles.loginText}>
                Já tem uma conta? <Text style={styles.loginLink}>Fazer login</Text>
              </Text>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
}

