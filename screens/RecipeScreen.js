/**
 * - This view will load a single recipe 
 */

 import React, { useState, useEffect } from 'react';

 import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

 import { Text } from 'react-native-elements';

 import RecipeLayout from '../components/RecipeLayout';

 import { getCurrUser } from '../services/LoginManager';

 export default function SingleRecipe({route}) {

      const { idMeal } = route.params;

      // add the three useState for the fetch process
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [dataResult, setDataResult] = useState([]);
      const [uid, setUid] = useState(0);

      // add useEffect for the fetch process 
      // calls the API that looks up drinks by specific ID to show full details 
      useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setDataResult(result);
            
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
      }, []);

      useEffect(() => {
      getCurrUser()
      .then (
        (result) => {
          let res = JSON.parse(result)
          if(res !== null) {
            setUid(res);
          }
        }, 
        (error) => {
          console.log('error: ' + error);
        }
      )
    });
    console.log(dataResult.meals);

    return (     
        <View style={styles.container}>
             {/* {displayRecipe(error, isLoaded, dataResult, uid)} */}
        </View>
        
    );
 }

function displayRecipe(error, isLoaded, dataResult, uid) {
   
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
        <ActivityIndicator size="large" color="#ABD1C6"/>
      </View>
    );
  } else if (dataResult === undefined) {
    return (
      <View>
        <Text>No Results</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {/* goes to RecipeLayout.js which prints the layout of the page design */}
          <RecipeLayout
          item = {dataResult.meals}
          currUser = {uid}
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