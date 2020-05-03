/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    borderRadius: 12,
    borderColor: Colors.mangadexBranding,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: Colors.darkGray,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    padding: 16,
  },
});
