/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const H_MAX_HEIGHT = 500;
const H_MIN_HEIGHT = 75;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const GalleryContainer = () => {
  return (
    <View style={styles.galleryRow}>
      <View style={styles.galleryContainer} />
      <View style={styles.galleryContainer} />
      <View style={styles.galleryContainer} />
    </View>
  );
};

const TabSwitcher = () => {
  return <View style={styles.tabSwitch} />;
};

const App = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE * 2],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileXPosition = headerScrollHeight.interpolate({
    inputRange: [H_MIN_HEIGHT, H_MAX_HEIGHT],
    outputRange: [-150, 0],
  });

  const profileYPosition = headerScrollHeight.interpolate({
    inputRange: [H_MIN_HEIGHT, H_MAX_HEIGHT],
    outputRange: [-40, -150],
  });

  const imageSize = headerScrollHeight.interpolate({
    inputRange: [0, H_MAX_HEIGHT],
    outputRange: [40, 125],
    extrapolateLeft: 'identity',
    extrapolateRight: 'clamp',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          // position: 'absolute',
          height: headerScrollHeight,
          backgroundColor: 'lightblue',
        }}>
        <View
          style={{
            height: 80,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 10,
            backgroundColor: 'white',
          }}>
          <Animated.View
            style={{
              backgroundColor: 'gray',
              marginTop: 15,
              height: 50,
              width: 50,
              borderRadius: 150,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: 'gray',
              marginTop: 15,
              height: 50,
              width: 50,
              borderRadius: 50,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: 'gray',
              height: imageSize,
              width: imageSize,
              borderRadius: imageSize,
              transform: [
                { translateX: profileXPosition },
                { translateY: profileYPosition },
              ],
            }}
          />
          <Animated.Text
            style={{
              fontSize: 40,
              color: 'black',
              transform: [{ translateX: 0 }, { translateY: 0 }],
            }}>
            Profile Name
          </Animated.Text>
          <Animated.Text style={{ fontSize: 20, color: 'black' }}>
            Description
          </Animated.Text>
          <Animated.Text style={{ fontSize: 20, color: 'gray' }}>
            Location
          </Animated.Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        decelerationRate={0.5}
        stickyHeaderIndices={[0]}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollOffsetY } } },
        ])}
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}>
        <TabSwitcher />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        <GalleryContainer />
        {/* <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: headerScrollHeight,
              width: '100%',
              overflow: 'hidden',
              zIndex: 999,
              // STYLE
              borderBottomColor: '#EFEFF4',
              borderBottomWidth: 2,
              padding: 10,
              backgroundColor: 'purple',
            }}
          /> */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {},
  tabSwitch: {
    height: 75,
    backgroundColor: 'blue',
  },
  galleryContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'red',
  },
  galleryRow: {
    padding: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
