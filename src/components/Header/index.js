/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import {useCollapsibleStack} from 'react-navigation-collapsible';
import {useColorScheme} from 'react-native-appearance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {ImageSource} from 'react-native/Libraries/Image/ImageSource';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
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

const Header: (props: HeaderProps) => React$Node = ({
  title,
  leftIcon,
  onLeftIconPress,
  insets = {bottom: 0, left: 0, right: 0, top: 0},
  style: {transform, ...style} = {},
  cover,
}) => {
  const {progress} = useCollapsibleStack();

  const topInset = insets.top + 20;

  const scheme = useColorScheme();

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -160 + topInset],
                extrapolate: 'clamp',
              }),
            },
            ...(transform ?? []),
          ],
        },
        style,
      ]}>
      {cover && (
        <View
          style={[
            StyleSheet.absoluteFill,
            scheme === 'dark'
              ? styles.coverBackgroundDark
              : styles.coverBackgroundLight,
            styles.shadow,
          ]}>
          <AnimatedImageBackground source={cover} style={styles.cover}>
            <LinearGradient
              colors={[
                'transparent',
                scheme === 'dark' ? Colors.darkGray : '#fff',
              ]}
              style={StyleSheet.absoluteFill}
            />
          </AnimatedImageBackground>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              scheme === 'dark'
                ? styles.coverBackgroundDark
                : styles.coverBackgroundLight,
              {
                opacity: progress,
              },
            ]}
          />
        </View>
      )}
      <Animated.View
        style={[
          styles.shadow,
          styles.header,
          scheme === 'dark' ? styles.backgroundDark : styles.backgroundLight,
          cover && styles.containerWithCover,
          !cover && {
            paddingTop: topInset,
          },
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
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Header;
