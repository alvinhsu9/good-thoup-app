/**
 * - This view will load details for a list of recipes that start with the letter a
 * - Only shows ones that start with the letter A since we don't want to call every letter in the alphabet yet to make the file size too large
 * 
 */
 import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView} from 'react-native';
 
 import { SearchBar, Text, Button} from 'react-native-elements';
 
 import React, { useState, useEffect } from 'react';

 import MySearchLayout from '../components/MySearchLayout';
 
 export default function Search({ navigation }) {

    // add the three useState for the fetch process
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);
    // gets state for the search bar
    const [searchTerm, setSearchTerm] = useState("");
    
    // updates the search bar as user types 
    const updateSearch = (search) => {
    setSearchTerm(search);
    };

   return (
       <View style={styles.container}>
        <View style={styles.topBarContainer}>
                <Text >Type in a letter to look for recipes!</Text>
                <SearchBar 
                    inputContainerStyle={styles.searchInputContainer}
                    containerStyle={styles.searchContainer}
                    placeholder="Search recipes by first letter..."
                    onChangeText={updateSearch}
                    value={searchTerm}
                />
                <Button 
                title={'Search'}
                onPress={() => {onSearchPressed(searchTerm, setIsLoaded, setDataResult, setError)}} 
                buttonStyle={{backgroundColor:'#F9BC60', borderRadius: 25,}}
                containerStyle={{
                    width: 150,
                    marginBottom: 10
                }}
                titleStyle={{
                    color: 'white',
                    fontFamily: 'Roboto_400Regular'
                }}
                />
             </View>
             {displayRecipeContainer(error, isLoaded, dataResult, navigation)}
         </View>
   );
 }

 function displayRecipeContainer(error, isLoaded, dataResult, navigation) {


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
             <FlatList
              data={dataResult.meals}
              renderItem={renderItem}
              keyExtractor={item => item.idMeal}
      />
      </ScrollView>
    );
   }
 }

 function onSearchPressed(searchTerm, setIsLoaded, setDataResult, setError) {
    console.log(searchTerm);
    // add useEffect for the fetch process 
    
        // API call for recipes that start with the letter A
          fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + searchTerm)
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
    alignItems: "center",
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
  }, 
  text: {
    color: '#2C2A31',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto_400Regular',
    flex: 1,
    justifyContent: 'center'
  }
 });