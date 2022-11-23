import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  if ( Platform.OS === "ios" ) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! IOS</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

  if ( Platform.OS === "android" ) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! Android</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
