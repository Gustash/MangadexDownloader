/**
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import {TextInput as RNTextInput, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, {Easing} from 'react-native-reanimated';

import styles from './styles';
import Colors from '../../styles/colors';
import {useColorScheme} from 'react-native-appearance';

const {useState, useRef, useEffect, useCallback} = React;

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

type Props = React.Config<AnimatedTextInput> & {
  icon?: string,
  onPress?: () => void,
};

const TextInput: (props: Props) => React$Node = ({
  style,
  icon,
  onPress,
  onFocus,
  onBlur,
  ...props
}) => {
  const iconAnimation: Animated.Value = useRef(new Animated.Value(1)).current;
  const [focused, setFocused] = useState(false);

  const scheme = useColorScheme();

  const _onFocus = useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );
  const _onBlur = useCallback(
    (e) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const iconContainerAnimationStyle = {
    transform: [
      {
        translateX: iconAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-16, 16],
        }),
      },
    ],
  };
  const textInputAnimationStyle = {
    transform: [
      {
        translateX: iconAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 16],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(iconAnimation, {
      toValue: focused ? 0 : 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [iconAnimation, focused]);

  return (
    <TouchableOpacity
      style={[styles.container, scheme === 'dark' && styles.containerDark]}
      onPress={onPress}>
      {icon?.length > 0 && (
        <Animated.View
          style={[styles.iconContainer, iconContainerAnimationStyle]}>
          <FontAwesome5 size={16} color={Colors.mangadexBranding} name={icon} />
        </Animated.View>
      )}
      <AnimatedTextInput
        style={[styles.textInput, textInputAnimationStyle, style]}
        placeholderTextColor={Colors.mangadexBranding}
        onPress={onPress}
        onFocus={_onFocus}
        onBlur={_onBlur}
        {...props}
      />
    </TouchableOpacity>
  );
};

export default TextInput;
