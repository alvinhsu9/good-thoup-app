/**
 * - This view will load the recipe page stack navigation
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryScreen from './CategoryScreen';
import SingleCategoryScreen from './SingleCategoryScreen';
import RecipeScreen from './RecipeScreen';

const Stack = createNativeStackNavigator();

export default function CategoryStack() {

  return (
        <Stack.Navigator initialRouteName="CategoryScreen" 
          screenOptions={{
            headerBackTitle: {
              display: 'block',
            },
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Roboto_400Regular',
            }
          }}>
            {/* Recipe page screen */}
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ headerShown: false}}
          />
            {/* Single category page */}
          <Stack.Screen
            name="SingleCategory"
            component={SingleCategoryScreen}
            options={{ 
              headerShown: true, 
              headerTitle: " ",
              headerStyle: {
                backgroundColor: '#F6F0EE'
              }}}
          />
        <Stack.Screen
            name="RecipeScreen"
            component={RecipeScreen}
            options={{ 
              headerShown: true, 
              headerTitle: " ",
              headerStyle: {
                backgroundColor: '#F6F0EE'
              }}}
          />
        </Stack.Navigator>
  );
}
