/**
 * - This view will show the layout page of what a single recipe looks like
 */

import { useState, useEffect } from 'react';
 import { StyleSheet, View, ScrollView } from 'react-native';
 import { Text, Button, Image } from 'react-native-elements';

 import { addFavorite, checkFavorite, delFavorite, getFavArray, updateFavArray } from '../services/FavouritesManager';
 
 export default function RecipeLayout({ item, currUser}) {
   
   // object key example to extract the ingredients data
 
     let meal = item.meals[0];
     let arrKeys = Object.keys(item.meals[0]).filter(curr => curr.slice(0, 13) === 'strIngredient');
  
 
     let mappedIngMeas = arrKeys.map((currIng) => {
         let currNum = Number.parseInt(currIng.replace('strIngredient', ''));
 
         let retItem = {
             key: currNum,
             name: item.meals[0][currIng],
             measure: item.meals[0]['strMeasure' + currNum]
         };
         return retItem;
     });

     mappedIngMeas = mappedIngMeas.filter(curr => curr.name != '' && curr.name !=null);
 
     const ingredientItem = mappedIngMeas.map((currItem) =>
     <Text key={currItem.key} style={styles.ingredientItem}>- {currItem.measure} {currItem.name}</Text>
     );

     //favorites
     const [isFav, setIsFav] = useState(null);
     


     initFavoriteState(currUser, item, setIsFav);

     return (
     <ScrollView>
       <View style={styles.container}>
             {/* Banner image and name of recipe  */}
             <View style={styles.recipeBannerContainer}>
                 <Text style={styles.heading}>{meal.strMeal}</Text>
                 <View style={styles.imageOverlay}>
                 <Image style={styles.recipeImage}  source={{ uri: meal.strMealThumb }}
                 />
                 </View>
             </View>
             {/* button to save recipe  */}
             <View style={styles.buttonDiv}>
             <Button style={styles.button} 
             title="Save recipe" 
             onPress={toggleFav(currUser, item, isFav, setIsFav )}
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
                     <Text style={styles.recipeText}>{meal.strInstructions}</Text>
                 </View>
             </View>
         </View>
 
     </ScrollView>
     );
 }

 function initFavoriteState(currUser, currMeal, setIsFav) {
  useEffect(() => {
    //get fave list from local storage
      getFavArray(currUser)
      .then(
        (result) => {
          const currFavList = JSON.parse(result);

          //determine whether this meal is in the favorites list
          if(currFavList !== null) {
            setIsFav(checkFavorite(currMeal.idMeal, currFavList))
          } else {
            setIsFav(false);
          }
        }, 
        (e) => {
          console.log('error: ' + e);
        }
      )
  })
 }

  function toggleFav(currUser, currMeal, isFav, setIsFav) {
    let currFavList;

    getFavArray(currUser)
    .then (
      (result) => {
        currFavList = JSON.parse(result);

        if(currFavList === null) {
          currFavList = [];
        }

        if(isFav) {

          let updatedFavList = delFavorite(currMeal, currFavList, currUser);
          updateFavArray(currUser, updatedFavList);

        } else {
          addFavorite(currMeal,currFavList, currUser);
          updateFavArray(currUser, currFavList);
        }
      }, 
      (error) => {
        console.log('error: ' + error);
      }
    )
    .then(
      setIsFav(!isFav)
    )
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
 