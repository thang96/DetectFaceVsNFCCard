import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {icons, images} from '../../Constants';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
const HomeScreen = () => {
  const navigation = useNavigation();
  const scanValue = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [hasNfc, setHasNFC] = useState(null);

  useEffect(() => {
    scanAnimated();
    readTag();
  }, [isFocused]);
  const spin = scanValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
  });
  const scanAnimated = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(scanValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
        readTag();
      }
      setHasNFC(deviceIsSupported);
    };
    checkIsSupported();
  }, []);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  };

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      idNfc = JSON.stringify(tag);
      if (idNfc != null && idNfc != undefined) {
        navigation.navigate('CameraDetectScreen', idNfc);
      }
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 16, color: 'white'}}>NFC not supported</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Scan your NFC card</Text>
      <View style={styles.containerViewScan}>
        <Image style={styles.eachContainerViewScan} source={icons.ic_crop} />
        <Image style={styles.childrenViewScan} source={icons.ic_card} />
        <Animated.View
          style={[styles.lineScan, {transform: [{translateY: spin}]}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(2,21,66)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
  },
  containerViewScan: {
    width: '90%',
    height: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainerViewScan: {
    tintColor: 'white',
    width: 300,
    height: 300,
    position: 'absolute',
  },
  childrenViewScan: {
    tintColor: 'white',
    width: 150,
    height: 150,
    position: 'absolute',
  },
  lineScan: {
    height: 2,
    backgroundColor: 'white',
    width: '70%',
    zIndex: 2,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
});

export default HomeScreen;
