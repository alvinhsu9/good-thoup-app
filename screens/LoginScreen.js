/**
 * - This view will load the initial screen users see when they open the app 
 * - Displays the sign in and create account buttons as well as the logo
 * 
 */

 import { StyleSheet, View, } from 'react-native';

 import { Text, Button, Image } from 'react-native-elements';

 import background from '../assets/soup-4.jpg';
 
 export default function LoginScreen({ navigation }) {
   return (
     <View style={styles.container}>
        <Text style={styles.intro}>Time for some</Text>
        <Text style={styles.companyName}>GOOD THOUP</Text>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/soupie.svg')}/>
        </View>
    <View>
         {/* Button links to the home screen with the bottom tab navigation  */}
         <Button 
           title="Sign in"
           onPress={() => navigation.navigate('SignInScreen')}
           buttonStyle={{backgroundColor:'#ffffff', borderRadius: 25,}}
           containerStyle={{
             width: 150,
             marginBottom: 25,
           }}
           titleStyle={{
             color: 'black',
             fontFamily: 'Roboto_400Regular'
           }}
         />
         {/* Button links to the home screen with the bottom tab navigation  */}
         {/* <Button 
           title="Create account"
           onPress={() => navigation.navigate('SignInScreen')}
           buttonStyle={{backgroundColor:'#F9BC60', borderRadius: 25,}}
           containerStyle={{
             width: 150,
           }}
           titleStyle={{
             color: 'white',
             fontFamily: 'Roboto_400Regular'
           }}
         /> */}
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
     backgroundImage: `url(${background})`,
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
 });
 
 
 