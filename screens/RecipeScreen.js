/**
 * - This view will load a single recipe 
 */

 import React, { useState, useEffect } from 'react';

 import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';


 import { Text, Button } from 'react-native-elements';

 import RecipeLayout from '../components/RecipeLayout';

 export default function SingleRecipe({route}) {

      const { idMeal } = route.params;
      console.log(idMeal);

      // add the three useState for the fetch process
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [dataResult, setDataResult] = useState([]);

      // add useEffect for the fetch process 
      // calls the API that looks up drinks by specific ID to show full details 
      useEffect(() => {
          fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
          .then(res => res.json())
          .then(
            (result) => {
              // successful load
              setIsLoaded(true);
              setDataResult(result);
              console.log(result);
            },
            (error) => {
              // handle errors here
              setIsLoaded(true);
              setError(error);        
            }
          )
        },
      []);

    return (     
        <View style={styles.container}>
             {displayRecipe(error, isLoaded, dataResult)}
        </View>
    );
 }

 function displayRecipe(error, isLoaded, dataResult, navigation) {
   
if (error) {
 // show an error message
 return (
   <View>
     <Text>Error: {error.message}</Text>
   </View>
 );
}
else if (!isLoaded) {
 // show the ActivityIndicator (spinner)
 return (
   <View>
     <Text>Preparing...</Text>
     <ActivityIndicator size="large" color="#ffffff"/>
   </View>
 );
}
else if (dataResult.meals === undefined) {
 // not an error but no drinks, so show a message
 return (
   <View>
     <Text>There are no records found for this search</Text>
   </View>
 );
}
else {
 return (
   <ScrollView>
    {/* goes to RecipeLayout.js which prints the layout of the page design */}
      <RecipeLayout
      item = {dataResult}
      />
   </ScrollView>

 );
}
}
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: "25px",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Sriracha_400Regular',
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
    paddingLeft: 25,
    fontSize: "20px",
  },
  dropDown: {
    width: "100%",
    height: 75,
    backgroundColor: "#7C8483",
    borderBottomWidth: "1px",
    borderBottomColor: "#2C2A31",
    position: "relative",
    marginBottom: "25",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instructionsContainer: {
    marginTop: 25,
    width: "80%",
  },
  arrow: {
    paddingRight: 25,
  },
  instructionsText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: "20px",
  },
  instructionsTextLast: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 25,
    fontSize: "20px",
  },
});