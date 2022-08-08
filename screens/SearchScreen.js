/**
 * - This view will load details for a list of recipes that start with the letter a
 * - Only shows ones that start with the letter A since we don't want to call every letter in the alphabet yet to make the file size too large
 * 
 */
 import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView} from 'react-native';
 
 import { SearchBar, Text} from 'react-native-elements';
 
 import React, { useState, useEffect } from 'react';

 import MySearchLayout from '../components/MySearchLayout';
 
 export default function Search({ navigation }) {

    // add the three useState for the fetch process
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);

    // add useEffect for the fetch process 
    useEffect(() => {
      // API call for recipes that start with the letter A
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
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
             {displayRecipeContainer(error, isLoaded, dataResult, navigation)}
         </View>
   );
 }

 function displayRecipeContainer(error, isLoaded, dataResult, navigation) {
   
     // gets state for the search bar
     const [search, setSearch] = useState("");
 
     // updates the search bar as user types 
   const updateSearch = (search) => {
     setSearch(search);
   };

  const renderItem = ({ item }) => (
    <MySearchLayout itemData={item} navigatorRef={navigation}/>
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
        <Text>Mixing...</Text>
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
    // show the data in the flat list and display it on the MyRecipeItem.js screen
    return (
      <ScrollView>
         {/* search bar  */}
             <View style={styles.topBarContainer}>
               <SearchBar 
                 inputContainerStyle={styles.searchInputContainer}
                 containerStyle={styles.searchContainer}
                 placeholder="Search recipes..."
                 onChangeText={updateSearch}
                 value={search}
               />
             </View>
             <FlatList
              data={dataResult.meals}
              renderItem={renderItem}
              keyExtractor={item => item.idMeal}
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
  heading: {
   textAlign: "center",
   marginTop: 25,
   fontSize: 30,
   fontFamily: 'Sriracha_400Regular',
 },
  topBarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 15,
  },
  searchContainer: {
    backgroundColor: "transparent",
    height: 20,
    border: "none",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchInputContainer: {
    height: 30,
    width: 300,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
  },
  randomize:{
    width: 100,
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  }
 });