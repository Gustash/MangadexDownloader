/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: Colors.darkGray,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 12,
  },
  centerText: {
    textAlign: 'center',
  },
  download: {
    marginLeft: 8,
  },
});
