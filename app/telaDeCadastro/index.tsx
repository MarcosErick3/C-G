import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import styles from './styles'
import { auth } from '../../DB/fireBase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useGoogleAuth } from '../../auth/googleSignIn'
import { FontAwesome } from '@expo/vector-icons'

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
    senhaConfirmacao: Yup.string()
        .oneOf([Yup.ref('senha'), undefined], 'As senhas não coincidem')
        .required('Campo obrigatório'),
})

type FormValues = {
    nome: string,
    email: string,
    senha: string,
    senhaConfirmacao: string
}

export default function Cadastro() {
    const [erroFirebase, setErroFirebase] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { promptAsync, request } = useGoogleAuth()

    const handleCadastro = async (values: FormValues) => {
        setLoading(true)
        setErroFirebase('')

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.senha)
            const user = userCredential.user

            await updateProfile(user, { displayName: values.nome })

            Alert.alert('Sucesso!', 'Cadastro feito com sucesso!')
            router.push('/telaDeLogin')
        } catch (error: any) {
            console.error('Erro ao cadastrar:', error)
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErroFirebase('Este e-mail já está cadastrado. Faça login ou use outro e-mail.')
                    break
                case 'auth/invalid-email':
                    setErroFirebase('E-mail inválido. Verifique e tente novamente.')
                    break
                case 'auth/weak-password':
                    setErroFirebase('A senha deve ter no mínimo 6 caracteres.')
                    break
                case 'auth/network-request-failed':
                    setErroFirebase('Falha na conexão. Verifique sua internet.')
                    break
                default:
                    setErroFirebase(error.message || 'Erro inesperado. Tente novamente.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Criar Conta</Text>

                <Formik
                    initialValues={{ nome: '', email: '', senha: '', senhaConfirmacao: '' }}
                    validationSchema={schema}
                    onSubmit={handleCadastro}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <TextInput
                                placeholder="Nome completo"
                                placeholderTextColor="#aaa"
                                style={styles.input}
                                onChangeText={text => {
                                    setErroFirebase('')
                                    handleChange('nome')(text)
                                }}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                            />
                            {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

                            <TextInput
                                placeholder="E-mail"
                                placeholderTextColor="#aaa"
                                keyboardType="email-address"
                                style={styles.input}
                                onChangeText={text => {
                                    setErroFirebase('')
                                    handleChange('email')(text)
                                }}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                            {erroFirebase !== '' && <Text style={[styles.error, { marginTop: 10 }]}>{erroFirebase}</Text>}

                            <TextInput
                                placeholder="Senha"
                                placeholderTextColor="#aaa"
                                secureTextEntry
                                style={styles.input}
                                onChangeText={text => {
                                    setErroFirebase('')
                                    handleChange('senha')(text)
                                }}
                                onBlur={handleBlur('senha')}
                                value={values.senha}
                            />
                            {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}

                            <TextInput
                                placeholder="Confirme sua senha"
                                placeholderTextColor="#aaa"
                                secureTextEntry
                                style={styles.input}
                                onChangeText={text => {
                                    setErroFirebase('')
                                    handleChange('senhaConfirmacao')(text)
                                }}
                                onBlur={handleBlur('senhaConfirmacao')}
                                value={values.senhaConfirmacao}
                            />
                            {touched.senhaConfirmacao && errors.senhaConfirmacao && (
                                <Text style={styles.error}>{errors.senhaConfirmacao}</Text>
                            )}

                            <TouchableOpacity
                                style={[styles.button, loading && { opacity: 0.6 }]}
                                onPress={handleSubmit as any}
                                disabled={loading}
                            >
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.googleButton}
                                onPress={() => promptAsync()}
                                disabled={!request}
                            >
                                <FontAwesome name="google" size={20} color="#fff" style={{ marginRight: 8 }} />
                                <Text style={styles.buttonText}>Entrar com Google</Text>
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
