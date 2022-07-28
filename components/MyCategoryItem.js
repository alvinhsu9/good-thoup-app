/**
 * - This view will loads the flatlist of ingredients with stylings attached 
 */

 import { Button, Text, Image } from 'react-native-elements';
 import { StyleSheet, View, } from 'react-native';
 
 // added navigatorRef here
 export default function myCategoryItem({ itemData, navigatorRef }) {
   return (    
     <View style={styles.container}>
         <View style={styles.itemContainer}>
             <View style={styles.itemColAlpha}>
                 {/* category name */}
                 <Text style={styles.itemText}>{itemData.strCategory}</Text>
             </View>
         </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
     container: {
         width: '100vw',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
     },
     itemContainer: {
         backgroundColor: '#ABD1C6',
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         height: '100px',
         marginTop: 15,
         marginBottom: 15,
         marginRight: 'auto',
         marginLeft: 'auto',
         width: '40%',
         borderRadius: 25,
     },
     itemColAlpha: {
         padding: 10,
         alignSelf: 'center',
         width: '100%',
     },
     itemText: {
         fontSize: 18,
         textTransform: 'uppercase',
         color: '#004643',
         lineHeight: 25,
         textAlign: 'center',
         fontFamily: 'Roboto_400Regular',
     },
 
 
 });