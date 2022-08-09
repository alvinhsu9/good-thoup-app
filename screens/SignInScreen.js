/**
 * - This view will load the initial screen users see when they open the app 
 * - Displays the sign in and create account buttons as well as the logo
 * 
 */
 import React, { useState} from 'react';

 import { StyleSheet, View, TextInput } from 'react-native';

 import { Text, Button, Image } from 'react-native-elements';

 import backgroundTwo from '../assets/soup-1.jpg';
 
 export default function SignInScreen({ navigation }) {
    
    const [email, setEmail] = useState('test@bcit.ca');
    const [pw, setPassword] = useState('appdev');

   return (
     <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/soupie.svg')}/>
        </View>
        <Text style={styles.formTitle}>Email or Username</Text>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder=""
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
            />
        </View>
        <Text style={styles.formTitle}>Password</Text>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder=""
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
        </View>
        <View style={styles.underInputContainer}>
            <Text style={styles.underInput}>Forgot Password?</Text>
            <Text style={styles.or}>Or</Text>
            <Text style={styles.underInput}>Sign Up!</Text>
        </View>
        <View>
            {/* Button links to the home screen with the bottom tab navigation  */}
            <Button 
            title="Sign In"
            onPress={() => navigation.navigate('BottomNavScreen', {email: email, pw: pw})}
            buttonStyle={{backgroundColor:'#F9BC60', borderRadius: 25,}}
            containerStyle={{
                width: 150,
            }}
            titleStyle={{
                color: 'white',
                fontFamily: 'Roboto_400Regular'
            }}
            />
        </View>
        <Text style={styles.info}>*Terms and conditions</Text>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      backgroundImage: `url(${backgroundTwo})`,
      backgroundPosition:'center', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    logoContainer: {
      marginBottom: 40,
      height: 100,
    },
    logo: {
      width: '90vw',
      height: 100,
    },
    intro: {
      color: 'white',
      fontSize: 18,
      fontWeight: 500,
      fontFamily: 'Roboto_400Regular',
    },
    companyName: {
     color: 'white',
     fontSize: 40,
     fontWeight: 800,
     fontFamily: 'Roboto_400Regular',
     marginBottom: 40,
    },
    info: {
     color: 'white',
      fontSize: 10,
      fontFamily: 'ZenMaruGothic_400Regular',
      fontWeight: 600,
      position: 'absolute',
      bottom: 0,
      textAlign: 'center',
      marginBottom: 20,
    },
    formTitle: {
        width: '58%',
        marginBottom: 5,
        textAlign: 'left',
        color: 'white',
    },
    inputView: {
        backgroundColor: "#ffffff",
        borderRadius: 30,
        width: "60%",
        height: 30,
        marginBottom: 20,
        alignItems: "center",
      },
      TextInput: {
        width: "90%",
        height: 30,
        flex: 1,
        color: 'black',
        fontFamily: 'Roboto_400Regular',
      },
      underInputContainer: {
        marginBottom: 30,
        textAlign: 'center',
      },
      or: {
        color: 'white',
      },
      underInput: {
        padding: 5,
        color: 'white',
        textDecorationLine: 'underline',
      }
  });
  