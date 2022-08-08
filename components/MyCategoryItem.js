/**
 * - This view will loads the flatlist of ingredients with stylings attached 
 */

 import { Button, } from 'react-native-elements';
 import { StyleSheet, View, } from 'react-native';
 
 // added navigatorRef here
 export default function myCategoryItem({ itemData, navigatorRef }) {
   return (    
     <View style={styles.container}>
         <View style={styles.itemContainer}>
                 {/* category name */}
                 <Button
                    title={itemData.strCategory}
                    buttonStyle={{backgroundColor:'#ABD1C6', borderRadius: 25}}
                    containerStyle={{
                        width: "100%",
                        height: 100,
                        display: "flex",
                        justifyContent: "center"
                    }}
                    titleStyle={{
                        color: '#004643',
                        fontFamily: 'Roboto_400Regular',
                        fontSize: 20,
                    }}
                    onPress={() => navigatorRef.navigate('SingleCategory', {
                        category: itemData.strCategory,
                    })}
                 />
         </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
     container: {
        width: '100%',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         alignContent: 'flex-start',
         flexWrap: 'wrap',
     },
     itemContainer: {
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
         height: 100,
         marginTop: 15,
         marginBottom: 15,
         width: '60%',
         borderRadius: 25,
         border: 'none',
         backgroundColor: '#ABD1C6',
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