/**
 * - This view will loads the flatlist of recipes with stylings attached 
 */

 import { Button, Text, Image } from 'react-native-elements';
 import { StyleSheet, View, } from 'react-native';
 
 // added navigatorRef here
 export default function RecipesDisplay({ itemData, navigatorRef }) {

   return (    
     <View style={recipeListStyles.container}>
         <View style={recipeListStyles.itemContainer}>
             <View style={recipeListStyles.itemColAlpha}>
                 {/* recipe thumbnail image */}
                 <Image style={recipeListStyles.itemThumb} source={{ uri: itemData.strMealThumb }}
                 />
             </View>
             <View style={recipeListStyles.itemColBeta}>
                 {/* recipe name */}
                 <Text style={recipeListStyles.itemText}>{itemData.strMeal}</Text>
                 {/* button that links to the specific single recipe page */}
                 <Button 
                     title="View Recipe"
                     buttonStyle={{backgroundColor:'#2C2A31'}}
                     containerStyle={{
                         width: 100,
                         height: 30,
                         marginTop: 10,
                         marginTop: 0,
                         marginBottom: 10,
                         marginLeft: 'auto',
                         marginRight: 'auto',
                     }}
                     titleStyle={{
                         color: 'white',
                         fontFamily: 'Roboto_400Regular',
                         fontSize: 11,
                     }}
                     onPress={() => navigatorRef.navigate('RecipeScreen', {
                         idMeal: itemData.idMeal,
                     })}
                 />
             </View>
         </View>
     </View>
   );
 }
 
 const recipeListStyles = StyleSheet.create({
     container: {
         width: '100vw',
     },
     itemContainer: {
         backgroundColor: 'white',
         flexDirection: 'column',
         justifyContent: 'space-around',
         height: 'auto',
         marginBottom: 15,
         padding: 10,
         width: '60%',
         marginRight: 'auto',
         marginLeft: 'auto',
         shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.1,  
        shadowRadius: 3,  
        borderRadius: 10,
        //  borderStyle: 'solid',
        //  borderWidth: '1px',
        //  borderColor: 'black',
     },
 
     itemColAlpha: {
         padding: 10,
         alignSelf: 'center',
     },
 
     itemColBeta: {
         flexGrow: 1,
         flexDirection: 'column',
         alignSelf: 'center',
         justifyContent: 'center',
     },
 
     itemThumb: {
         width:100,
         height:100,
         resizeMode: 'center',
         borderRadius: 10,
     },
 
     itemText: {
         fontSize: 18,
         color: '#004643',
         fontWeight: 800,
         lineHeight: 25,
         paddingLeft: 25,
         paddingRight: 25,
         paddingBottom: 20,
         paddingTop: 10,
         textAlign: 'center',
         fontFamily: 'ZenMaruGothic_400Regular',
     },

 
 });