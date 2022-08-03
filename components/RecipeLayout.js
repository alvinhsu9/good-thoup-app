/**
 * - This view will show the layout page of what a single recipe looks like
 */

 import { StyleSheet, View, ScrollView } from 'react-native';
 import { Text, Button, Image } from 'react-native-elements';
 
 export default function RecipeLayout({ item }) {
   
   // object key example to extract the ingredients data
 
     let drink = item.drinks[0];
     let arrKeys = Object.keys(item.drinks[0]).filter(curr => curr.slice(0, 13) === 'strIngredient');
 
     console.log(arrKeys);  
 
     let mappedIngMeas = arrKeys.map((currIng) => {
         let currNum = Number.parseInt(currIng.replace('strIngredient', ''));
 
         let retItem = {
             key: currNum,
             name: item.drinks[0][currIng],
             measure: item.drinks[0]['strMeasure' + currNum]
         };
         return retItem;
     });
 
     console.log(mappedIngMeas);
 
     mappedIngMeas = mappedIngMeas.filter(curr => curr.name != '' && curr.name !=null);
 
     console.log(mappedIngMeas);
 
     const ingredientItem = mappedIngMeas.map((currItem) =>
     <Text key={currItem.key} style={styles.ingredientItem}>- {currItem.measure} {currItem.name}</Text>
     );
 
     return (
     <ScrollView>
       <View style={styles.container}>
             {/* Banner image and name of recipe  */}
             <View style={styles.recipeBannerContainer}>
                 <Text style={styles.heading}>{meals.strMeal}</Text>
                 <View style={styles.imageOverlay}>
                 <Image style={styles.recipeImage}  source={{ uri: drink.strMealThumb }}
                 />
                 </View>
             </View>
             {/* button to save recipe  */}
             <View style={styles.buttonDiv}>
             <Button style={styles.button} 
             title="Save recipe" 
             buttonStyle={{
                 backgroundColor: '#2C2A31',
             }}/>
             </View>
             <View style={styles.recipeTextContainer}>
               {/* recipe ingredients  */}
                 <View style={styles.ingredientsContainer}>
                     <Text style={styles.text}>Ingredients</Text>
                     {ingredientItem}
                 </View>
                 <View style={styles.instructionsContainer}>
                       {/* recipe instructions  */}
                     <Text style={styles.text}>Instructions</Text>
                     <Text style={styles.recipeText}>{drink.strInstructions}</Text>
                 </View>
             </View>
         </View>
 
     </ScrollView>
     );
 }
 
 const styles = StyleSheet.create({
     ingredientItem: {
         fontSize: 18,
         color: 'white',
     },
     container: {
         backgroundColor: '#F6F0EE',
         alignItems: 'center',
         justifyContent: 'flex-start',
       },
       recipeBannerContainer: {
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         marginBottom: 25,
         width: "100vw",
       },
       imageOverlay: {
         width: 350,
         height: 350,
         backgroundColor: "black",
       },
       recipeImage: {
         width: 350,
         height: 350,
         position: "relative",
       },
       heading: {
         color: '#2C2A31',
         fontSize: 30,
         marginTop: 10,
         marginBottom: 10,
         fontFamily: 'Inter_400Regular',
       },
       buttonDiv: {
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         marginBottom: 25,
       },
       button: {
         width: 125,
       },
       text: {
         color: "white",
         textAlign: 'center',
         fontSize: "25px",
         fontWeight: 800,
         marginBottom: 25,
       },
       ingredientsContainer: {
         marginTop: 15,
       },
       instructionsContainer: {
         marginTop: 25,
       },
       arrow: {
         paddingRight: 25,
       },
       recipeText: {
         fontSize: "18px",
         marginBottom: 25,
         color: "white",
       },
       recipeTextContainer: {
         backgroundColor: "#7C8483",
         width: "90vw",
         paddingLeft: 50,
         paddingRight: 50,
         paddingTop: 25,
         paddingBottom: 25,
         marginBottom: 25,
         borderRadius: 15,
       }
 });
 