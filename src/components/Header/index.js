/**
 * @format
 * @flow strict-local
 */
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useCollapsibleStack} from 'react-navigation-collapsible';
import {useColorScheme} from 'react-native-appearance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ImageSource} from 'react-native/Libraries/Image/ImageSource';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import commonStyles from '../../styles/common';
import Text from '../Text';
import Colors from '../../styles/colors';

export type HeaderProps = {
  title: string,
  leftIcon?: string,
  onLeftIconPress?: () => void,
  insets: {
    bottom: number,
    left: number,
    right: number,
    top: number,
  },
  style?: ViewStyleProp,
  cover?: ImageSource,
};

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground,
);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Header: (props: HeaderProps) => React$Node = ({
  title,
  leftIcon,
  onLeftIconPress,
  insets = {bottom: 0, left: 0, right: 0, top: 0},
  style,
  cover,
}) => {
  const {progress} = useCollapsibleStack();
  const [coverLoaded, setCoverLoaded] = useState(false);

  const coverAnimation = useRef(new Animated.Value(0)).current;
  const scheme = useColorScheme();

  const _onCoverLoadEnd = useCallback(() => {
    console.log('ended');
    setCoverLoaded(true);
  }, []);
  const _onCoverLoadStart = useCallback(() => {
    console.log('started');
    setCoverLoaded(false);
  }, []);

  useEffect(() => {
    Animated.timing(coverAnimation, {
      toValue: coverLoaded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [coverAnimation, coverLoaded]);

  return (
    <Animated.View
      style={[
        styles.shadow,
        {
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -160 + insets.top],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
        style,
      ]}>
      {cover && (
        <AnimatedImageBackground
          source={cover}
          style={[
            styles.cover,
            !coverLoaded && scheme === 'dark' && styles.coverLoadingDark,
            !coverLoaded && scheme !== 'dark' && styles.coverLoadingLight,
            style,
          ]}
          onLoadStart={_onCoverLoadStart}
          onLoadEnd={_onCoverLoadEnd}>
          <AnimatedLinearGradient
            colors={[
              'transparent',
              scheme === 'dark' ? Colors.darkGray : '#fff',
            ]}
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: scheme === 'dark' ? Colors.darkGray : '#fff',
              opacity: progress,
            }}
          />
        </AnimatedImageBackground>
      )}
      <View
        style={[
          styles.container,
          scheme === 'dark' ? styles.backgroundDark : styles.backgroundLight,
          {
            paddingTop: insets.top,
          },
          cover && styles.containerWithCover,
        ]}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftIconPress}>
            <FontAwesome5
              name={leftIcon}
              size={16}
              color={scheme === 'dark' ? '#fff' : '#000'}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <Text style={[styles.title]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Animated.View>
  );
};

export default Header;
