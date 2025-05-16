// app/telaDeCadastro/index.tsx
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import styles from './styles'
import { auth } from '../../DB/fireBase'  // Importa o auth aqui
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    senha: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
    senhaConfirmacao: Yup.string()
        .oneOf([Yup.ref('senha'), undefined], 'As senhas não coincidem')
        .required('Campo obrigatório'),
})

export default function Cadastro() {
    const router = useRouter()

    const handleCadastro = async (values: any) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.senha);
            const user = userCredential.user;

            await updateProfile(user, { displayName: values.nome });

            Alert.alert('Sucesso!', 'Cadastro feito com sucesso!');
            router.push('/telaDeLogin');
        } catch (error: any) {
            console.log('Erro ao cadastrar:', error.message);
            Alert.alert('Erro', `Não foi possível fazer o cadastro: ${error.message}`);
        }
    };

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
                    onSubmit={handleCadastro} // Usa a função que cadastra no Firebase
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

                            <TextInput
                                placeholder="Confirme sua senha"
                                placeholderTextColor="#aaa"
                                secureTextEntry
                                style={styles.input}
                                onChangeText={handleChange('senhaConfirmacao')}
                                onBlur={handleBlur('senhaConfirmacao')}
                                value={values.senhaConfirmacao}
                            />
                            {touched.senhaConfirmacao && errors.senhaConfirmacao && (
                                <Text style={styles.error}>{errors.senhaConfirmacao}</Text>
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
