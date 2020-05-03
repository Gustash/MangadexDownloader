/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {View} from 'react-native';
import Colors from '../../styles/colors';
import {useColorScheme} from 'react-native-appearance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import unescape from 'lodash.unescape';

import Text from '../Text';
import Divider from '../Divider';
import styles from './styles';

type Props = {
  volume?: string,
  chapter: string,
  title: string,
  group_name: string,
};

const ChapterCard: (props: Props) => React$Node = ({
  volume,
  chapter,
  title,
  group_name,
}) => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        scheme === 'dark' && styles.containerDark,
      ]}>
      {volume ? (
        <>
          <View>
            <Text style={styles.title}>Vol.</Text>
            <Text style={styles.smallText}>{volume}</Text>
          </View>
          <Divider vertical />
        </>
      ) : null}
      <View>
        <Text style={styles.title}>Ch.</Text>
        <Text style={styles.smallText}>{chapter}</Text>
      </View>
      <Divider vertical />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{unescape(title)}</Text>
        <Text style={styles.smallText}>{unescape(group_name)}</Text>
      </View>
      <FontAwesome5
        name="arrow-circle-down"
        size={20}
        color={Colors.mangadexComplimentary}
        style={styles.download}
      />
    </View>
  );
};

export default ChapterCard;
