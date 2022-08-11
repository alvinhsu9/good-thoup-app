import { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import { getFavArray } from '../services/FavouritesManager';
import { getCurrUser } from '../services/LoginManager';
import FavouritesItem from '../components/FavouritesItem';

export default function Favourites({route, navigation}) {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);

    const { currUser } = route.params;

    useEffect(() => {
        getFavArray(currUser)
        .then (
            (result) => {
                let arrFav = JSON.parse(result);                                   
                setDataResult(arrFav);  
                setIsLoaded(true);
            },
            (error) => {               
                console.log('error: ' + error);
                setError(error);
                setIsLoaded(true);
            }
        ) 

        const willFocusSubscription = navigation.addListener('focus', () => {
        getFavArray(currUser)
        .then(
            (result) => {           
            setDataResult(JSON.parse(result));
            setIsLoaded(true);
            },
            (error) => {
            setError(error);
            setIsLoaded(true);
            }
        )
        });

    return willFocusSubscription;
    },[]);

    return(
        <View style={styles.container}>
            <Text style ={styles.heading}>My Favourites</Text>
            <Button
            title="Sync Favourites"
            buttonStyle = {{
                backgroundColor:"#F9BC60",
                paddingVertical: 10,
            }}
            containerStyle={{
                width: 150,
                marginTop: 20,
                marginBottom: 40,
                borderRadius: 25
            }}
            titleStyle={{
                color: 'white',
                fontFamily: 'Roboto_400Regular',
                fontSize: 16,
            }}
            onPress={() => {syncFavourites(currUser, dataResult)}}
            />
            {displayRecipe(error, isLoaded, dataResult, navigation)}
        </View>
    );
}

function syncFavourites(currUser, locArr) {

    //get favourites from api
    let dbArr;

    fetch ('https://thoupapi.michellecheung.net/api/v1/users/getFaves.php?id='+ currUser)
    .then(res => res.json())
    .then(
        (result) => {
            dbArr = result; 
            console.log(dbArr);
        },
        (error) => {
            console.log('error: ' + error)
        }
    )

    console.log(dbArr);
   
    if(dbArr !== undefined) {
        console.log(dbArr);
        //check which one is shorter
        if (locArr.length < dbArr.length) {
            //item(s) was deleted
            //find intersection
            let diff = dbArr
                    .filter(x => !locArr.includes(x))
                    .concat(locArr.filter(x => !dbArr.includes(x)));
            //add intersection list to db
            for(let i=0; i<diff.length; i++) {
                fetch('https://thoupapi.michellecheung.net/api/v1/favourites/delete.php?id=' + currUser + '&rid=' + diff[i].rid)
            }
            

        } else if (locArr.length > dbArr.length) {
            //item(s) was added
            //find added items
            let added = locArr
                        .filter(x => !dbArr.includes(x))
                        .concat(dbArr.filter(x => !locArr.includes(x)));

            for (let i=0; i<added.length; i++) {

                fetch('https://thoupapi.michellecheung.net/api/v1/users/create.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(added[i]) 
                })

                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                    },
                    (error) => {
                        console.log('error: ' + error );
                    }
                )
            }
        }
    }

    //update if there are any differences
        
}




function displayRecipe(error, isLoaded, dataResult, navigation) {
    

    const renderItem = (item) => {
        return (
        <FavouritesItem item={item} navigatorRef={navigation}/> 
        );
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