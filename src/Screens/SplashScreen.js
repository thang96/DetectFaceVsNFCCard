import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoading from '../Components/CustomLoading';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 300);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('HomeNavigation');
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      {loading && <CustomLoading modalVisible={loading} />}
      <Text style={styles.text}>Detect Face</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'black', fontWeight: '600', fontSize: 28, fontStyle: 'italic'},
});
export default SplashScreen;
