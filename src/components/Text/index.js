/**
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import {Text as RNText} from 'react-native';

import styles from './styles';
import {useColorScheme} from 'react-native-appearance';

const Text: (React.ElementConfig<Text>) => React$Node = ({style, ...props}) => {
  const scheme = useColorScheme();

  return (
    <RNText
      style={[scheme === 'dark' ? styles.dark : styles.light, style]}
      {...props}
    />
  );
};

export default Text;
