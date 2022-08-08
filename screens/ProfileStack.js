import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './ProfileScreen';
import Favourites from './FavouritesScreen';
import SingleRecipe from './RecipeScreen';

const ProfStack = createNativeStackNavigator();

export default function ProfileStack() {
    return(
        <ProfStack.Navigator 
        initialRouteName = "Profile"
        screenOptions={{
            headerBackTitle: {
              display: 'block',
            },
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Roboto_400Regular',
            }
          }}>
            <ProfStack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false}}
            />
            <ProfStack.Screen
                name="Favourites"
                component={Favourites}
                options={{ headerShown: false}}
            />
            <ProfStack.Screen
                name="RecipeScreen"
                component={SingleRecipe}
                options={{ headerShown: false}}
            />
        </ProfStack.Navigator>
    )
}
