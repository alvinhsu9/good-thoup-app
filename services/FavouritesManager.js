import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from 'react';

export async function getFavArray(uid) {
    let arrFav = [];
    try { 
        arrFav = await AsyncStorage.getItem(uid)
    } catch(e) {
        console.log('error: '+e);
    }

    return arrFav;
}

export async function updateFavArray(uid, arrFav) {
    try {
        await AsyncStorage.setItem(uid, arrFav)
    } catch (e) {
        console.log('error: ' + e);
    }
}

export function checkFavorite(checkKey, currFavList) {
    let i = currFavList.findIndex(item => item.id == checkKey);
    if(i >= 0) {
        return true;
    }
    return false;
}

export function addFavorite(newMeal, currFavList, currUser) {
    

    if(!checkFavorite(newMeal.idMeal, currFavList)) {
        let count = currFavList.length();
        const meal = {
            id: count,
            uid: currUser,
            rid: newMeal.idMeal,
            name: newMeal.strMeal,
            image: newMeal.strMealThumb
        }

            useEffect(() => {
            fetch('https://thoupapi.michellecheung.net/api/v1/favourites/create.php?', {
                headers: {
                    'Accept': 'application/jsonn',
                    'Content-Type': 'application/json'
                }, 
                method: "POST",
                body: JSON.stringify(meal) 
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Success: ' + result);
                },
                (error) => {
                    console.log('Error: ' + error);
                }    
            ) 
        })

        currFavList.push(meal);
    }
}

export function delFavorite(delMeal, currFavList, currUser) {

    useEffect(() => {
        fetch('https://thoupapi.michellecheung.net/api/v1/favorites/delete.php?id=' + currUser + '&rid=' + delMeal.idMeal)
        .then(res => res.json())
        .then(
            (result) => {
                console.log('Success: ' + result);
            },
            (error) => {
                console.log('Error: ' + error);
            }    
        ) 
    })

    let filteredList = currFavList.filter(item => item.idMeal != delMeal.idMeal);
    return filteredList;

}