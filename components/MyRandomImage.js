/**
 * - This view will loads the flatlist of recipes with stylings attached 
 */
 import { Button, Text, Image } from 'react-native-elements';
 import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageBackground } from 'react-native-web';
 
 // added navigatorRef here
 export default function MyRandomImage({ itemData }) {

    const image = { uri: itemData.strMealThumb };

    return (    
        <View style={styles.container}>
            <ImageBackground imageStyle={styles.itemContainer} source={image}>
            </ImageBackground>
        </View>
    );
 }
 
 const styles = StyleSheet.create({
     container: {
        width: Dimensions.get("window").width,
     },
     itemContainer: {
        width: Dimensions.get("window").width,
         height: '200px',
         flex: 1,
         position: "absolute",
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         resizeMode: 'cover',
     },
 });