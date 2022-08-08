/**
 * - This view will load details for a specific categories of drinks as well as a list of static popular drinks  
 */

 import React, { useRef, useState, useEffect } from 'react';

 import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
 import { Text, Button, Image } from 'react-native-elements';
import { getCurrUser } from '../services/LoginManager';


 export default function Profile({navigation}) {

  const [currUser, setCurrUser] = useState('0')

    useEffect(() => {
      getCurrUser()
      .then(
        (result) => {
          let res = JSON.parse(result)
          if(res !==null) {
            setCurrUser(result);
          }
        },
        (error) => {
          console.log('error: ' + error);
        }
      )
    }) 
    return (
      <ScrollView>
        <View style={styles.container}>
            <Image style={styles.profile} source={require('../assets/profile.png')}/>
            <Text style={styles.name}>Bob Ross</Text>
            <Button 
                    title="Edit Info"
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
          <View style={styles.mainButtons}>
            <Button 
                icon={
                  <MaterialCommunityIcons name="heart-outline" color={'white'} size={'50px'} style={{paddingTop: 15}}/>
                }
                title="Favourites"
                buttonStyle={{backgroundColor:'#E16162', display:'flex', flexDirection:'column'}}
                containerStyle={{
                    width: 125,
                    height: 'auto',
                    marginTop: 10,
                    borderRadius: 25,
                }}
                titleStyle={{
                    color: 'white',
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 11,
                    paddingBottom: 20,
                }}
                onPress = {() => navigation.navigate('Favourites', {
                  currUser: currUser 
                })}
            />
            <Button 
                icon={
                  <MaterialCommunityIcons name="view-list-outline" color={'white'} size={'50px'} style={{paddingTop: 15}}/>
                }
                title="My Recipes"
                buttonStyle={{backgroundColor:'#ABD1C6', display:'flex', flexDirection:'column'}}
                containerStyle={{
                    width: 125,
                    height: 'auto',
                    marginTop: 10,
                    borderRadius: 25,
                }}
                titleStyle={{
                    color: 'white',
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 11,
                    paddingBottom: 20,
                }}
            />
          </View>
          <View style={styles.otherInfo}>
                <Text style={styles.infoTextFirst}>About</Text>
                <Text style={styles.infoTextMid1}>FAQ</Text>
                <Text style={styles.infoTextMid2}>Privacy Policy</Text>
                <Text style={styles.infoTextLast}>Terms & Conditions</Text>
          </View>
          <View style={styles.share}>
            <Button 
                    title="Share Profile"
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
  profile: {
    width: '250px',
    height: '250px',
    borderRadius: 200,
    marginTop: 25,
  },
  name: {
    fontSize: '25px',
    fontFamily: 'Roboto_400Regular',
    marginTop: 15,
  },
  mainButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  otherInfo: {
    marginTop: 25,
    width: '75%',
    marginBottom: 15,
  },
  infoTextFirst: {
    borderTopWidth: '1px',
    borderTopColor: '#D9D9D9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoTextMid1: {
    borderTopWidth: '1px',
    borderTopColor: '#D9D9D9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoTextMid2: {
    borderTopWidth: '1px',
    borderTopColor: '#D9D9D9',
    borderBottomWidth: '1px',
    borderBottomColor: '#D9D9D9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoTextLast: {
    borderBottomWidth: '1px',
    borderBottomColor: '#D9D9D9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  share: {
    marginBottom: 25,
  }
}
);