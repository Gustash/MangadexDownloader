/**
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useContext} from 'react';
import {View, SafeAreaView, FlatList, Image, StatusBar} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import TextInput from '../../components/TextInput';
import commonStyles from '../../styles/common';
import styles from './styles';
import LibraryContext from '../../context/LibraryContext';
import Text from '../../components/Text';
import {useColorScheme} from 'react-native-appearance';
import Colors from '../../styles/colors';

type Props = {
  navigation: NavigationProp,
};

const Library: (props: Props) => React$Node = ({navigation}) => {
  const [state] = useContext(LibraryContext);
  const [query, setQuery] = useState('');

  const scheme = useColorScheme();

  const _onSearch = useCallback(() => {
    navigation.navigate('Search', {query});
  }, [navigation, query]);

  console.log(state.manga);

  return (
    <SafeAreaView
      style={[
        commonStyles.container,
        commonStyles.containerSpacing,
        {paddingTop: StatusBar.currentHeight + 20},
      ]}>
      <FlatList
        ListHeaderComponent={
          <TextInput
            icon="search"
            placeholder="Search"
            style={styles.searchTextInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={_onSearch}
          />
        }
        data={state.manga}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <View
            style={{
              marginVertical: 16,
              padding: 8,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: scheme === 'dark' ? Colors.darkGray : '#fff',
              borderRadius: 8,
            }}>
            <Image
              source={{uri: `https://mangadex.org/${item.cover_url}`}}
              style={{width: 40, height: 40, marginRight: 8, borderRadius: 4}}
            />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Library;
