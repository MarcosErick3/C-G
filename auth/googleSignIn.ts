import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../DB/fireBase'

WebBrowser.maybeCompleteAuthSession()

export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '380473543117-jk8s14qmtdu3idjghtg7ek60da4gqgeu.apps.googleusercontent.com',
    })

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
                .then(userCred => {
                    console.log('Usuário logado com Google:', userCred.user)
                })
                .catch(error => {
                    console.error('Erro no login com Google:', error)
                })
        }
    }, [response])

    return { promptAsync, request }
}
