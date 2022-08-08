import { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import { getFavArray } from '../services/FavouritesManager';
import { getCurrUser } from '../services/LoginManager';
import CategoryLayout from '../components/CategoryLayout';

export default function Favourites({navigation}) {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);
    const [uid, setUid] = useState(0)

 
    useEffect(() => {
      getCurrUser()
      .then(
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
    })
    
    useEffect(() => {
        getFavArray(uid)
        .then (
            (result) => {
                if (result !== undefined) {
                    setIsLoaded(true);
                    setDataResult(result);                    
                } else {
                    setDataResult([]);
                }
            },
            (error) => {
                console.log('error: ' + error);
                setError(error);
                setIsLoaded(true);
            }
        )
    })


    return(
        <View>
            <Text>My Favourites</Text>
            {displayRecipe(error, isLoaded, dataResult, navigation)}
        </View>
    )

}

function displayRecipe(error, isLoaded, dataResult, navigation) {
    const renderItem = (item) => {
        <CategoryLayout itemData={item} navigatorRef={navigation}/> 
    }

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
    else if (dataResult == []) {
    // not an error but no meals, so show a message
        return (
            <View>
                <Text>No Favourites</Text>
            </View>
        );
    }
    else {
    // show the data in the flat list and display data on CategoryLayout.js
        return (
            <View style={styles.container}>
                <FlatList
                    data={dataResult}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
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
   heading: {
    color: '#2C2A31',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Roboto_400Regular',
   }
 });