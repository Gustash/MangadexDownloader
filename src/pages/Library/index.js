/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';

import Text from '../../components/Text';
import commonStyles from '../../styles/common';

const Library: () => React$Node = () => {
  return (
    <View style={[commonStyles.container, commonStyles.centerContents]}>
      <Text>Mangadex!</Text>
    </View>
  );
};

export default Library;
