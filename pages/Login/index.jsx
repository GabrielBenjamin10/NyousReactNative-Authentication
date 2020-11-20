import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarToken = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
    }

    const Entrar = () => {
        
        const corpo = {
            email : email,
            senha : senha
        }

        fetch('http://192.168.7.129:5000/api/Account/login', {
           method : 'POST',
           headers : {
               'Content-Type' : 'application/json'
           },
           body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status != 404){
                alert('Login efetuado com sucesso!')
                salvarToken(data.token)
                navigation.push('Autenticado')
            }else{
                alert('Dados incorretos')
            }
        })
    }

    return(
        <View style={styles.container}>

        <Image
            style={styles.logo}
            source={require('../../assets/logo.svg')}
        />

            <Text>Login</Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu email..."
            />
            
            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry={true}
                placeholder="Digite sua senha..."
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Entrar}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 300,
    },
    input : {
        width: '90%',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    button : {
      backgroundColor : 'black',
      padding: 10,
      borderRadius: 6,
      width: '90%',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText : {
        color : 'white'
    },
    logo : {
        width: 252,
        height: 250
    }
});

export default Login;