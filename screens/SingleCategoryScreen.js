/**
 * - This view will load a single recipe 
 */

 import React, { useState, useEffect } from 'react';

 import { StyleSheet, View, ScrollView, ActivityIndicator, FlatList } from 'react-native';

 import { Text } from 'react-native-elements';

 import CategoryLayout from '../components/CategoryLayout';

 export default function SingleCategoryScreen({route, navigation}) {

      const { idMeal } = route.params;
      console.log(idMeal);

      // add the three useState for the fetch process
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [dataResult, setDataResult] = useState([]);

      // add useEffect for the fetch process 
      // calls the API that looks up meals by specific ID to show full details 

      useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + idMeal)
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
             {displayRecipe(error, isLoaded, dataResult, navigation)}
        </View>
    );
 }

 function displayRecipe(error, isLoaded, dataResult, navigation) {

    const renderItem = ({ item }) => (
        <CategoryLayout itemData={item} navigatorRef={navigation}/>
      );
   
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
   // not an error but no meals, so show a message
   return (
     <View>
       <Text>There are no records found for this search</Text>
     </View>
   );
  }
  else {
   // show the data in the flat list and display data on CategoryLayout.js
   return (
    <ScrollView>
    <View style={styles.container}>
        <FlatList
              data={dataResult.meals}
              renderItem={renderItem}
              keyExtractor={item => item.idMeal}
          />
    </View>
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