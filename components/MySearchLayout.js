/**
 * - This view will loads the flatlist of recipes with stylings attached 
 */

 import { Button, Text, Image } from 'react-native-elements';
 import { StyleSheet, View, } from 'react-native';
 
 // added navigatorRef here
 export default function MySearchLayout({ itemData, navigatorRef }) {
   return (    
     <View style={styles.container}>
         <View style={styles.itemContainer}>
             <View style={styles.itemColAlpha}>
                 {/* recipe thumbnail image */}
                 <Image style={styles.itemThumb} source={{ uri: itemData.strMealThumb }}
                 />
             </View>
             <View style={styles.itemColBeta}>
                 {/* recipe name */}
                 <Text style={styles.itemText}>{itemData.strMeal}</Text>
                 {/* button that links to the specific single recipe page */}
             </View>
         </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
     container: {
         width: '100vw',
     },
     itemContainer: {
         backgroundColor: '#ABD1C6',
         flexDirection: 'row',
         justifyContent: 'space-around',
         height: 'auto',
         marginBottom: 15,
         padding: 10,
         width: '90%',
         marginRight: 'auto',
         marginLeft: 'auto',
         borderRadius: 25,
     },
 
     itemColAlpha: {
         padding: 10,
         flexBasis: '40%',
         maxWidth: '40%',
         alignSelf: 'center',
     },
 
     itemColBeta: {
         flexBasis: '60%',
         maxWidth: '60%',
         flexGrow: 1,
         flexDirection: 'column',
         alignSelf: 'center',
     },
 
     itemThumb: {
         width:100,
         height:100,
         resizeMode: 'center',
         borderRadius: 10,
     },
 
     itemText: {
         fontSize: 18,
         color: '#004643',
         lineHeight: 25,
         fontFamily: 'Roboto_400Regular',
     },
 });