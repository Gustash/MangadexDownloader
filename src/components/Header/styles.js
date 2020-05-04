/**
 * @format
 * @flow strict-local
 */

import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

export default StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
  },
  containerWithCover: {
    paddingTop: 160,
    backgroundColor: null,
  },
  backgroundLight: {
    backgroundColor: '#fff',
  },
  backgroundDark: {
    backgroundColor: Colors.darkGray,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  titleWithCover: {
    color: '#fff',
  },
  icon: {
    marginRight: 16,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
  },
  coverBackgroundLight: {
    backgroundColor: '#fff',
  },
  coverBackgroundDark: {
    backgroundColor: Colors.darkGray,
  },
});
