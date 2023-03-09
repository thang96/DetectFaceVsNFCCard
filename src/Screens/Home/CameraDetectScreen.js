import React, {useEffect, useRef, useState} from 'react';
import {runOnJS} from 'react-native-reanimated';

import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';

import {Camera} from 'react-native-vision-camera';
import {scanFaces, Face} from 'vision-camera-face-detector';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const CameraDetectScreen = () => {
  const navigation = useNavigation();
  const widthWindow = Dimensions.get('window').width;
  const heightWindow = Dimensions.get('window').height;
  const [faces, setFaces] = useState([]);
  const [listPoint, setListPoint] = useState([]);
  const scaleX = 720 / widthWindow;
  const scaleY = 1280 / heightWindow;
  const camera = useRef();
  const photo = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [active, setActive] = useState(isFocused);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
    })();
  }, []);

  useEffect(() => {
    if (faces != null && faces != undefined && active == true) {
      setListPoint(faces[0]?.contours?.FACE);
      setTimeout(async () => {
        try {
          photo.current = await camera.current.takePhoto();
          setActive(false);
          navigation.navigate('ResultScreen', photo.current);
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    }
  }, [faces]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);
  if (device == null) {
    return <ActivityIndicator size={20} color={'red'} />;
  }

  const takeCapture = async () => {
    photo.current = await camera.current.takePhoto();
    setActive(false);
    navigation.navigate('ResultScreen', photo.current);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={active}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        photo={true}
      />
      {listPoint &&
        listPoint.map((item, index) => {
          return (
            <View
              key={`${index.toString()}`}
              style={[
                styles.point,
                {
                  transform: [
                    {translateX: item?.x / scaleX},
                    {translateY: item?.y / scaleY},
                  ],
                },
              ]}
            />
          );
        })}
      <TouchableOpacity style={styles.buttonCapture} onPress={takeCapture} />
    </View>
  );
};
const styles = StyleSheet.create({
  point: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  buttonCapture: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
export default CameraDetectScreen;
