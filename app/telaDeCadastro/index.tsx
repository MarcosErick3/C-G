// app/telaDeCadastro/index.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import styles from './style'

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
})

export default function Cadastro() {
    const router = useRouter()

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Criar Conta</Text>

                <Formik
                    initialValues={{ nome: '', email: '', senha: '' }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        Alert.alert('Cadastro feito com sucesso!', JSON.stringify(values, null, 2))
                        console.log('Usuário cadastrado:', values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <TextInput
                                placeholder="Nome completo"
                                placeholderTextColor="#aaa"
                                style={styles.input}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                            />
                            {touched.nome && errors.nome && (
                                <Text style={styles.error}>{errors.nome}</Text>
                            )}

                            <TextInput
                                placeholder="E-mail"
                                placeholderTextColor="#aaa"
                                keyboardType="email-address"
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
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('./telaDeLogin/')}>
                                <Text style={styles.cadastroText}>Já tem uma conta? Fazer login</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    )
}
