/**
 * - This view will load details for a specific categories of drinks as well as a list of static popular drinks  
 */

 import React, { useRef, useState, useEffect } from 'react';

 import AsyncStorage from '@react-native-async-storage/async-storage';

 import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
 
 import { Text, Image, Card } from 'react-native-elements';

 import { getFeaturedData, FeaturedData } from '../data/FeaturedData';

 import MyRandomImage from '../components/MyRandomImage';

 import Carousel from 'react-native-anchor-carousel';

 import { updateFavArray } from '../services/FavouritesManager';
 import { getCurrUser } from '../services/LoginManager';
import { ActivityIndicator } from 'react-native-web';

 export default function HomeScreen( {  } ) {

    // useState for random banner pic

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);
    const [uid, setUid] = useState(0);

    useEffect(() => {
      getCurrUser()
      .then(
        (result) => {
          let res = JSON.parse(result)
          if(res !== null) {
            setUid(res);
          }
        }, 
        (error) => {
          console.log('error: ' + error);
        }
      )
    })

    // get random banner image
    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(
          (result) => {
            // successful load
            setDataResult(result);
            setIsLoaded(true);
          },
          (error) => {
            // handle errors here
            setIsLoaded(true);
            setError(error);        
          }
        )
      },
     []);
      
      storeFaves(uid);
      
     return (
        <View style={styles.container}>
             {homeDisplay( dataResult, isLoaded)}
        </View>
   );
 }
 
  function homeDisplay( dataResult, isLoaded) {

     // reference is needed for onPress handler
  const carouselRef = useRef(null);

  // screen width is needed for container
  const { width: windowWidth } = Dimensions.get('window');

  const renderItem = ({ index, }) => (
    // touchable opacity for the carousel
    <TouchableOpacity
      activeOpacity={.7}
      style={[styles.caroItem]}
      onPress={() => {
        carouselRef.current.scrollToIndex(index);
      }}>
      <View style={styles.imageDiv}>
        {/* static image used in carousel */}
        <Image
          style={styles.caroImage}
          source={{ uri: getFeaturedData()[index].imageUri}}
        />
        <View style={styles.textDiv}>
          {/* drink category name */}
          <Text style={styles.exploreText}>
          {getFeaturedData()[index].title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

      if(isLoaded) {

     return (
         <ScrollView style={styles.container}>
              <View style={styles.banner}>
                <MyRandomImage itemData={dataResult.meals[0]}/>
              </View>
              <View>
                <Text style={styles.h1}>
                    Welcome Back!
                </Text>
              </View>
              <View>
                <Text style={styles.heading}>Featured Recipes</Text>
                {/* carousel  */}
                <Carousel
                      style={styles.carousel}
                      data={FeaturedData}            
                      renderItem={renderItem}
                      initialIndex={0}

                      itemWidth={windowWidth * 0.7}
                      inActiveScale={0.6}
                      separatorWidth={15}
                      containerWidth={windowWidth}

                      inActiveOpacity={0.3}

                      loop={true}
            
                      ref={carouselRef}
                    />
                </View>
                
         </ScrollView>
       );
        } else {
            <View>
                <Text>Loading...</Text>
                <ActivityIndicator size='large' color="#abd1c6"/>
            </View>
        }
     }

   function storeFaves(uid) {

        let arrFav;
        
        useEffect(() => {
            fetch('https://thoupapi.michellecheung.net/api/v1/users/getFaves.php?id=' + uid)
            .then(res => res.json())
            .then(
                (result) => {
                    arrFav = result;
                    updateFavArray(uid, arrFav);
                },
                (error) => {
                    console.log('error: ' + error);
                }
            )
        });
        
        updateFavArray(uid, arrFav);
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F0EE',
    },
    banner: {
        height: "40%",
    },
    h1: {
        textAlign: "center",
        marginTop: 50,
        fontSize:30,
        fontWeight: 800,
        fontFamily: 'Roboto_400Regular',
        color: '#004643',

    },
    heading: {
      textAlign: "center",
      marginTop: 50,
      fontSize: 20,
      fontWeight: 500,
      fontFamily: 'Roboto_400Regular',
      color: '#004643',
    },
    itemThumb: {
      width: '100%',
      height: 200,
    },
    carousel: {
      flexGrow: 0,
      marginTop: 30,
      height: 325,
    },
    caroItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 300,
    },
    imageDiv: {
      backgroundColor: '#ffffff',
      borderRadius: 15,
      padding: 5,
      marginBottom: 15,
      width: 250,
      height: 'auto',
    },
    caroImage: {
      width: "100%",
      height: 200,
      aspectRatio: 1,
      borderRadius: 10,
    },
    exploreText: {
      fontSize: 15,
      fontFamily: 'Roboto_400Regular',
      fontWeight: "bold",
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 30,
      color: '#004643',
    },
}
);