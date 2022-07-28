/**
 * - This view will load the bottom tab navigation for the app  
 * - it is part of the stack navigation on the login screen page
 */


 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
 import HomeScreen from './HomeScreen';
 import Categories from './CategoryScreen';
 import AddRecipe from './AddRecipeScreen';
 import Search from './SearchScreen';
 import Profile from './ProfileScreen';
 
 const BottomTab = createBottomTabNavigator();
 
 
 export default function Home() {
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
             component={Categories}
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
             component={Search}
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
             component={Profile}
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
 }