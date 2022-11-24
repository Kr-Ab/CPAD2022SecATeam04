import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title='Click Here' onPress={() => alert("Clicked")}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LoginScreen;