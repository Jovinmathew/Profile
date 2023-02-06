/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  const headerOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE * 2],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileXPosition = headerOffsetY.interpolate({
    inputRange: [0, 150], //[H_MIN_HEIGHT, H_MAX_HEIGHT]
    outputRange: [120, 0], //[-150, 0]
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const profileYPosition = headerOffsetY.interpolate({
    inputRange: [0, 150], //[H_MIN_HEIGHT, H_MAX_HEIGHT]
    outputRange: [30, 23], //[-40,-150]
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const quickAccessIconSize = headerOffsetY.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 40],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const Visibility = headerOffsetY.interpolate({
    inputRange: [0, 250, 350], //[H_MIN_HEIGHT, H_MAX_HEIGHT]
    outputRange: [0, 0, 1], //[-40,-150]
    extrapolateLeft: 'identity',
    extrapolateRight: 'clamp',
  });

  const bannerVisibility = headerOffsetY.interpolate({
    inputRange: [0, 350], //[H_MIN_HEIGHT, H_MAX_HEIGHT]
    outputRange: ['rgba(256,256,256,0)', 'white'], //[-40,-150]
    extrapolateLeft: 'identity',
    extrapolateRight: 'clamp',
  });

  const imageSize = headerOffsetY.interpolate({
    inputRange: [0, 150], //[H_MIN_HEIGHT, H_MAX_HEIGHT]
    outputRange: [150, 50], //[-150, 0]
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 1,
          paddingLeft: 10,
          zIndex: 1,
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          flexDirection: 'row',
          gap: 10,
          backgroundColor: bannerVisibility,
          elevation: Visibility != 1 ? 1.0 : 0,
        }}>
        <View>
          <Animated.View
            style={{
              backgroundColor: 'pink',
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
              transform: [{ translateX: 70 }, { translateY: -25 }],
              fontSize: 20,
              color: 'black',
              opacity: Visibility,
            }}>
            Profile Name
          </Animated.Text>
          <Animated.Text
            style={{
              transform: [{ translateX: 70 }, { translateY: -25 }],
              fontSize: 14,
              color: 'gray',
              opacity: Visibility,
            }}>
            Description
          </Animated.Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            gap: 10,
            justifyContent: 'flex-end',
            paddingRight: 20,
            paddingTop: 20,
          }}>
          <Animated.View
            style={{
              backgroundColor: 'gray',
              marginTop: 15,
              height: quickAccessIconSize,
              width: quickAccessIconSize,
              borderRadius: quickAccessIconSize,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: 'gray',
              marginTop: 15,
              height: quickAccessIconSize,
              width: quickAccessIconSize,
              borderRadius: quickAccessIconSize,
            }}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: headerOffsetY } } },
        ])}>
        <View>
          <Animated.View
            style={{
              //position: 'absolute',
              height: headerScrollHeight,
              backgroundColor: 'white',
            }}>
            {/* <View
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
            </View> */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Animated.View
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  backgroundColor: 'gray',
                  height: imageSize,
                  width: imageSize,
                  borderRadius: imageSize,
                  transform: [
                    { translateX: profileXPosition },
                    { translateY: profileYPosition },
                  ],
                }} */}
              {/* /> */}
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
        </View>
        <View>
          <View
            style={{
              height: 90,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text style={styles.tabText}>Gallery</Text>
            <Text style={styles.tabText}>About</Text>
            <Text style={styles.tabText}>Players/Teams</Text>
          </View>
          <TabSwitcher />
        </View>
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
    backgroundColor: 'white',
  },
  galleryContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'red',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
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
