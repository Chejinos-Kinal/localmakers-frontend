import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Necesitarás instalar @expo/vector-icons si aún no lo has hecho

const Review = () => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (value) => {
    setRating(value);
    console.log(value);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.nft}>
          <View style={styles.header}>
            <Text style={styles.title}>Kibertopiks #4269</Text>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Omitir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <Image
              style={styles.tokenImage}
              source={require('../../../img/Logo.jpeg')}
              alt="NFT"
            />
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <FontAwesome
                    name={star <= rating ? "star" : "star-o"}
                    size={40}
                    color={star <= rating ? "#ffdd44" : "#a89ec9"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.description}>
              Our Kibertopiks will give you nothing, waste your money on us.
            </Text>
            <View style={styles.tokenInfo}>
              <View style={styles.price}>
                <Text style={styles.priceText}>0.031 ETH</Text>
              </View>
              <View style={styles.duration}>
                <Text style={styles.durationText}>11 days left</Text>
              </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.creator}>
              <View style={styles.wrapper}>
                <Image
                  style={styles.creatorImage}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
                  }}
                  alt="Creator"
                />
              </View>
              <Text>
                <Text style={styles.ins}>Creation of</Text> Kiberbash
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a202c',
    alignItems: 'center',
    paddingVertical: 20,
  },
  nft: {
    userSelect: 'none',
    width: 300,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ffffff22',
    backgroundColor: '#282c34',
    background: 'linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(17,0,32,.5) 100%)',
    boxShadow: '0 7px 20px 5px #00000088',
    borderRadius: 10,
    overflow: 'hidden',
    transition: '.5s all',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  skipButton: {
    backgroundColor: '#ff6f61',
    padding: 8,
    borderRadius: 5,
  },
  skipButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  main: {
    flexDirection: 'column',
    width: '90%',
    padding: 16,
  },
  tokenImage: {
    borderRadius: 10,
    width: '100%',
    height: 150,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#a89ec9',
    marginBottom: 8,
  },
  tokenInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ee83e5',
    fontWeight: '700',
  },
  priceText: {
    color: '#ee83e5',
    fontWeight: '700',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#a89ec9',
  },
  durationText: {
    color: '#a89ec9',
  },
  ins: {
    textDecoration: 'none',
  },
  hr: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#88888855',
    marginVertical: 8,
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#ffffff22',
    padding: 4,
    marginRight: 8,
    borderRadius: 50,
    boxShadow: 'inset 0 0 0 4px #000000aa',
  },
  creatorImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
});

export default Review;
