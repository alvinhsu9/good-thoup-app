/**
 * - This view will show the layout page of what a single recipe looks like
 */

import { useState, useEffect } from 'react';
 import { StyleSheet, View, ScrollView } from 'react-native';
 import { Text, Button, Image, Icon } from 'react-native-elements';

 import { addFavorite, checkFavorite, delFavorite, getFavArray, updateFavArray } from '../services/FavouritesManager';
 
 export default function RecipeLayout({item, currUser}) {
   
   // object key example to extract the ingredients data
    
     let meal = item[0];
     let arrKeys = Object.keys(meal).filter(curr => curr.slice(0, 13) === 'strIngredient');

     let mappedIngMeas = arrKeys.map((currIng) => {
         let currNum = Number.parseInt(currIng.replace('strIngredient', ''));

         let retItem = {
             key: currNum,
             name: meal['strIngredient' + currNum],
             measure: meal['strMeasure' + currNum]
         };
         return retItem;
     });

     mappedIngMeas = mappedIngMeas.filter(curr => curr.name != '' && curr.name !=null);
 
     const ingredientItem = mappedIngMeas.map((currItem) =>
     <Text key={currItem.key} style={styles.ingredientItem}>- {currItem.measure} {currItem.name}</Text>
     );

     //favorites
     const [isFav, setIsFav] = useState(null);
    //  const [arrFav, setArrFav] = useState([]);

    //  check if it's in favorites
  //   useEffect(() => {
  //   //get fave list from local storage
  //     getFavArray(currUser)
  //     .then(
  //       (result) => {
  //         if(result !== undefined) {
  //         const currFavList = JSON.parse(result);
  //         if (checkFavorite(item.idMeal, currFavList)) {
  //           setIsFav(true);
  //           setArrFav(currFavList);
  //         } else {
  //           setIsFav(false);
  //           setArrFav(currFavList);
  //         }
  //         } 
  //         else {
  //           setArrFav([]);
  //           setIsFav(false);
  //         }
  //       }, 
  //       (e) => {
  //         console.log('error: ' + e);
  //       }
  //     )
  // },[]);

     initFaveState(currUser, item, setIsFav);

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
             <Icon
                type='ionicon'
                name={isFav ? 'heart' : 'heart-outline'}
                color={isFav !== null ? '#cc0000' : '#E16162'}
                onPress={() => {toggleFav(currUser, item, isFav, setIsFav) }}
              />
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


 function initFaveState(currUser,currMeal, setIsFav) {
  
  useEffect(() => {
    getFavArray(currUser)
    .then(
      (result) => {
        const currFavList = JSON.parse(result);
        if(currFavList !== null || currFavList !== []) {
          console.log('here');
          console.log(currFavList);
          setIsFav(checkFavorite(currMeal[0].idMeal, currFavList))
        } else {
          setIsFav(false);
        }
      },
      (e) => {
        console.log('error: ' + e);
      }
    )
  }, []);
 }

  function toggleFav(currUser, currMeal, isFav, setIsFav) {

    let arrFav;

    getFavArray(currUser)
      .then(
        (result) => {
          if(result === [] || result === null) {
            arrFav = [];
          } else {
            let res = JSON.parse(result);
            arrFav = res;
          }
          if(isFav) { 
            // remove from favourites
            let updatedFavList = delFavorite(currMeal, arrFav, currUser);
            updateFavArray(currUser, updatedFavList);
          } else {
            // add to favourites
            addFavorite(currMeal, arrFav, currUser);
            updateFavArray(currUser, arrFav);
          }
          
        },
        (error) => {
          console.log('error: ' + error);
        }
      )
      .then(
        setIsFav(!isFav)
      )

    // if it is favorited, remove it 
    // if (isFav) {
    //   let updatedFavList = delFavorite(currMeal, arrFav, currUser);
    //   setArrFav(updatedFavList);
    //   setIsFav(false);
    //   updateFavArray(currUser, updatedFavList);
    // } else if (arrFav == [] && !isFav) {
    //   // if it is not favorited, add it
      
    // } else {
     
      
    // }
    
  }
 
 const styles = StyleSheet.create({
     ingredientItem: {
         fontSize: 18,
         color: '#004643',
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
         fontFamily: 'Roboto_400Regular',
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
         color: '#004643',
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
         color: '#004643'
       },
       recipeTextContainer: {
        //  backgroundColor: "#7C8483",
        
         width: "90vw",
         paddingLeft: 50,
         paddingRight: 50,
         paddingTop: 25,
         paddingBottom: 25,
         marginBottom: 25,
         borderRadius: 15,
       }
 });
 