import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCurrUser() {
    let currUser;

    try {
        currUser = await AsyncStorage.getItem('currUser')
    } catch (e) {
        console.log(e);
    }

    return currUser;
}