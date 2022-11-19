import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { app } from './src/firebase/config'

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      if (user) {
        const db = getFirestore(app);
        getDoc(doc(db, "users", user.uid))
        .then((document) => {
          const userData = document.data()
          setLoading(false)
          setUser(userData)
          })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {	
    return (	
      <>Loading</>	
    )	
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}