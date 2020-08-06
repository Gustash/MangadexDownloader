/**
 * @format
 * @flow strict-local
 */

import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

export default StyleSheet.create({
  flatListContentContainer: {
    paddingTop: 208,
  },
  downloadAllRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  downloadAllText: {
    color: Colors.mangadexBranding,
    fontSize: 16,
    lineHeight: 20,
  },
});
