/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {View} from 'react-native';

import styles from './styles';

export type DividerProps = {
  vertical: boolean,
};

const Divider: (props: DividerProps) => React$Node = ({vertical = false}) => {
  return (
    <View
      style={[styles.container, vertical ? styles.vertical : styles.horizontal]}
    />
  );
};

export default Divider;
