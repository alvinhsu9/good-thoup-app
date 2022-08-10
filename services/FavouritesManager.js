import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFavArray(uid) {
    let arrFav = [];
    try { 
        arrFav = await AsyncStorage.getItem(uid + '_arrFav')
    } catch(e) {
        console.log('error: '+ e);
    }

    return arrFav;
}

export async function updateFavArray(uid, arrFav) {
    try {
        await AsyncStorage.setItem(uid + '_arrFav', JSON.stringify(arrFav))
    } catch (e) {
        console.log('error: ' + e);
    }
}

export function checkFavorite(checkKey, currFavList) {
    
    if (currFavList !== []) {
        let i = currFavList.findIndex(item => item.rid == checkKey);
        if(i >= 0) {
            return true;
        }
        return false;
    }
    return true;
}

export function addFavorite(newMeal, currFavList, currUser) {
    
    let count = currFavList.length;

    if(!checkFavorite(newMeal.idMeal, currFavList)) {
        const meal = {
            id: count,
            uid: currUser,
            rid: newMeal[0].idMeal,
            name: newMeal[0].strMeal,
            image: newMeal[0].strMealThumb
        }
        if(currFavList === []) {
            currFavList = [meal];
        } else {
            currFavList.push(meal);
        }
        
    }
}

export function delFavorite(delMeal, currFavList) {
    
    let filteredList = currFavList.filter(item => item.rid != delMeal[0].idMeal);
    return filteredList;

}