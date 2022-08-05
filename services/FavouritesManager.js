import AsyncStorage from "@react-native-async-storage/async-storage";

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