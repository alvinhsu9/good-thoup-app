import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from './SearchScreen';
import SingleRecipe from './RecipeScreen';

const SearStack = createNativeStackNavigator();

export default function SearchStack() {
    return (
        <SearStack.Navigator
        initialRouteName = "SearchScreen"
        screenOptions={{
            headerBackTitle: {
              display: 'block',
            },
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Roboto_400Regular',
            }
          }}>
            <SearStack.Screen
                name="SearchScreen"
                component={Search}
                options={{headerShown: false}}
            />
            <SearStack.Screen
                name="RecipeScreen"
                component={SingleRecipe}
                options={{headerShown: false}}
            />
          </SearStack.Navigator>
    )
}
