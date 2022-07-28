/**
 * - This view will load details for a specific categories of drinks as well as a list of static popular drinks  
 */

 import React, { useRef, useState, useEffect } from 'react';

 import { StyleSheet, View, ScrollView, TextInput } from 'react-native';

 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
 import { Text, Button, Image } from 'react-native-elements';


 export default function AddRecipe( { navigation } ) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.upload}>
            <Text>Upload Thumbnail</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.inputDishInfo}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Dish Name"
                  placeholderTextColor="#004643"
              />
            </View>
            <View style={styles.inputDishInfo}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Category"
                  placeholderTextColor="#004643"
              />
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoHeader}>Ingredients</Text>
            <View style={styles.inputIngredientStep}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Ingredient"
                  placeholderTextColor="#004643"
              />
            </View>
            <Button 
                icon={
                  <MaterialCommunityIcons name="plus" color={'#004643'} style={{paddingRight: 8}}/>
                }
                title="Add"
                buttonStyle={{backgroundColor:'#ABD1C6', display:'flex', flexDirection: 'row-reverse', justifyContent: 'space-between',  opacity: '50%'}}
                containerStyle={{
                    width: '80%',
                    height: 'auto',
                    marginTop: 10,
                    borderRadius: 5,
                }}
                titleStyle={{
                    color: '#004643',
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 14,
                    paddingLeft: 8,
                }}
            />
          </View>
          <View style={styles.infoStep}>
            <Text style={styles.infoHeader}>Step</Text>
            <View style={styles.inputIngredientStep}>
              <TextInput
                  style={styles.TextInput}
                  placeholder="Step"
                  placeholderTextColor="#003f5c"
              />
            </View>
            <Button 
                icon={
                  <MaterialCommunityIcons name="plus" color={'#004643'} style={{paddingRight: 8}}/>
                }
                title="Add"
                buttonStyle={{backgroundColor:'#ABD1C6', display:'flex', flexDirection: 'row-reverse', justifyContent: 'space-between',  opacity: '50%'}}
                containerStyle={{
                    width: '80%',
                    height: 'auto',
                    marginTop: 10,
                    borderRadius: 5,
                }}
                titleStyle={{
                    color: '#004643',
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 14,
                    paddingLeft: 8,
                }}
            />
          </View>
          <View style={styles.share}>
            <Button 
                    title="Share Recipe"
                    buttonStyle={{backgroundColor:'#F9BC60'}}
                    containerStyle={{
                        width: 100,
                        height: 30,
                        marginTop: 10,
                        borderRadius: 100,
                    }}
                    titleStyle={{
                        color: '#004643',
                        fontFamily: 'Roboto_400Regular',
                        fontSize: 11,
                    }}
              />
            </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F0EE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  upload: {
    marginTop: 15,
    backgroundColor: '#ABD1C6',
    padding: 100,
  },
  info: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
  },
  infoStep: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  inputDishInfo: {
    backgroundColor: "#ABD1C6",
    opacity: '50%',
    borderRadius: 5,
    width: "80%",
    height: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  TextInput: {
    width: "90%",
    height: 30,
    flex: 1,
    color: '#004643',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
  },
  infoHeader: {
    marginBottom: 10,
    fontSize: '18px',
  },
  inputIngredientStep: {
    backgroundColor: "#ABD1C6",
    opacity: '50%',
    borderRadius: 5,
    width: "80%",
    height: 30,
    alignItems: "center",
  },
  share: {
    marginBottom: 25,
  }
}
);