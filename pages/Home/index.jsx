import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

    const [token, setToken] = useState('');

    useEffect(()=>{
        getData();
    }, [])

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@jwt')
          if(value !== null) {
            setToken(value);
          }
        } catch(e) {
          // error reading value
        }
    }
    
    return(
        <View>
            <Text>Home</Text>
            <Text>{token}</Text>
        </View>
    )
}

export default Home;