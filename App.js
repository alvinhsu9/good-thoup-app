import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { Roboto_400Regular, } from '@expo-google-fonts/roboto';
import { ZenMaruGothic_400Regular } from '@expo-google-fonts/zen-maru-gothic';


import LoginScreen from './screens/LoginScreen';
import SignInScreen from './screens/SignInScreen';
import BottomNavScreen from './screens/BottomNavScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default 
function App() {
  // the hook that loads the font  
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    ZenMaruGothic_400Regular,
  });
  
  // conditional to show a spinner while the font is loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#b9c8ff' />
      </View>
    );
  }

  // the stack navigation for the landing screen to load into the bottom tab nav screen
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" 
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Roboto_400Regular',
            },
            headerStyle: {
              backgroundColor: '#F6F0EE',
              borderBottom: 'none',
            },
          }}>
          <Stack.Screen
            name="Login"
            // name="HomeScreen"
            component={LoginScreen}
            // component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavScreen"
            component={BottomNavScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },

});