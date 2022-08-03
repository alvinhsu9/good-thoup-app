/**
 * - This view will load details for a list of ingredients 
 * 
 */
 import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView} from 'react-native';

 import { Text } from 'react-native-elements';
 
 import React, { useState, useEffect } from 'react';

 import MyCategoryItem from '../components/MyCategoryItem';
 
 export default function Categories({ navigation }) {

      // add the three useState for the fetch process
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [dataResult, setDataResult] = useState([]);

          // add useEffect for the fetch process 
    useEffect(() => {
      // API call for ingredients list
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(
          (result) => {
            // successful load
            setIsLoaded(true);
            setDataResult(result);
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
            {displayIngredientContainer(error, isLoaded, dataResult, navigation)}
        </View>
  );
}


function displayIngredientContainer(error, isLoaded, dataResult, navigation) {
 
   // gets state for the search bar
   const [search, setSearch] = useState("");
 
   // updates the search bar as user types 
   const updateSearch = (search) => {
     setSearch(search);
   };

   const renderItem = ({ item }) => (
    <MyCategoryItem itemData={item} navigatorRef={navigation}/>
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
   else if (dataResult.categories === undefined) {
    // not an error but no categories, so show a message
    return (
      <View>
        <Text>There are no records found for this search</Text>
      </View>
    );
   }
   else {
    // show the data in the flat list and display it on the myCategoryItem.js screen
    return (
      <ScrollView>
          <FlatList
            style={styles.listContainer}
            data={dataResult.categories}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={item => item.strCategory}
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
     width: '100%',
   },
   listContainer: {
    width: '100vw',
    backgroundColor: '#EFF0F3',
   },
 });