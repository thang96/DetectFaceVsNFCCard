import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const ResultScreen = prop => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `file://${route.params?.path}`}}
        style={{width: '100%', height: '100%'}}
        resizeMode={'contain'}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.button}>
        <Text style={styles.text}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
    alignItems: 'center',
    width: 250,
    height: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {color: 'white', fontWeight: 'bold', fontSize: 20},
});
export default ResultScreen;
