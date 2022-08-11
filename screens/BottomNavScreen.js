/**
 * - This view will load the bottom tab navigation for the app  
 * - it is part of the stack navigation on the login screen page
 */
import {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, Button} from 'react-native-elements';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
 import HomeScreen from './HomeScreen';
 import CategoryStack from './CategoryStack';
 import AddRecipe from './AddRecipeScreen';
 import Search from './SearchScreen';
 import SearchStack from './SearchStack';
 import ProfileStack from './ProfileStack';
import backgroundTwo from '../assets/soup-1.jpg';
 
 const BottomTab = createBottomTabNavigator();
 
 
 export default function Home({route}) {
    const {email, pw} = route.params;
    const [infoCorrect, setInfoCorrect] = useState(false);
    const [uid, setUid] = useState(0);
    // const [fav, setFav] = useState([]);

        useEffect(() => {
            fetch('https://thoupapi.michellecheung.net/api/v1/users/read.php?email=' + email + '&pw=' + pw)
            .then (res => res.json())
            .then(
                (result) => {
                    if (result !== null) {
                      setUid(result);
                      setInfoCorrect(true);
                    }
                },
                (error) => {             
                    setInfoCorrect(false);
                    console.log('error: ' + error);
                }
            )
        }, []);
        
        //if correct, get user's favorites
        // useEffect(() => {
        //     fetch('https://thoupapi.alvinhsu.ca/api/v1/users/getFaves.php?id=' + uid)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             setFav(result);
        //             //and put it into local storage
        //             storeUserData();
        //         },
        //         (error) => {
        //             console.log('error: ' + error);
        //         }
        //     )
        // });

        // AsyncStorage.clear();

    const storeUserData = async () => {
        
        try {
            await AsyncStorage.setItem('currUser', uid)
        } catch (e) {
            console.log('error: ' + e);
        }
      }
    
    if(infoCorrect) {
      storeUserData();
     return (
         <BottomTab.Navigator
           screenOptions={{
             tabBarActiveTintColor: '#E16162',
             tabBarInactiveTintColor: '#F9BC60',
             tabBarActiveBackgroundColor: '#ffffff',
             tabBarInactiveBackgroundColor: '#ffffff',
           }}
         >

        {/* Loads the home page stack navigation */}
           <BottomTab.Screen
             name="Home"
             component={HomeScreen}
             options={{
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="home-outline" color={color} size={size}/>
                 ),
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#F9BC60',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                headerTitleAlign: 'center',
             }}
           />
 
        {/* Loads the categories page stack navigation */}
           <BottomTab.Screen
             name="Categories"
             component={CategoryStack}
             options={{
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="apps" color={color} size={size}/>
                 ),
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#F9BC60',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                headerTitleAlign: 'center',
             }}
           />
 
        {/* Loads the add recipe page stack navigation */}
           <BottomTab.Screen
             name="Add Recipe"
             component={AddRecipe}
             options={{
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size}/>
                 ),
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#F9BC60',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                headerTitleAlign: 'center',
             }}
           />
        {/* Loads the search page stack navigation */}
            <BottomTab.Screen
             name="Search"
             component={SearchStack}
             options={{
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="magnify" color={color} size={size}/>
                 ),
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#F9BC60',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                headerTitleAlign: 'center',
             }}
           />
        {/* Loads the profile page stack navigation */}
             <BottomTab.Screen
             name="My Profile"
             component={ProfileStack}
             options={{
                 tabBarIcon: ({ color, size }) => (
                   <MaterialCommunityIcons name="account-outline" color={color} size={size}/>
                 ),
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#F9BC60',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                headerTitleAlign: 'center',
             }}
           />
         </BottomTab.Navigator>
     );
    } else {
        return(
            <View style={styles.container}>
                <Text style={styles.error}>Login info incorrect. Please make sure your information entered is correct.</Text>
                <Button
                title={"Try Again"}
                onPress = {() => navigation.navigate('SignInScreen')}
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
        );
    }
 }

 const styles=StyleSheet.create({
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
    error: {
        backgroundColor: 'rgba(255,97,98,0.8)',
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 30,
        borderRadius: 20,
        justifyContent: 'center',
        color: '#fff',
    }
 }) 