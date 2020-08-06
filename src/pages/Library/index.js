/**
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import TextInput from '../../components/TextInput';
import commonStyles from '../../styles/common';
import styles from './styles';
import Text from '../../components/Text';
import {useColorScheme} from 'react-native-appearance';
import Colors from '../../styles/colors';
import {useRealm} from '../../context/RealmContext';

type Props = {
  navigation: NavigationProp,
};

const Library: (props: Props) => React$Node = ({navigation}) => {
  const realm = useRealm();
  const [query, setQuery] = useState('');

  const scheme = useColorScheme();

  const _onSearch = useCallback(() => {
    navigation.navigate('Search', {query});
  }, [navigation, query]);

  return (
    <SafeAreaView
      style={[
        commonStyles.container,
        {paddingTop: StatusBar.currentHeight + 20},
      ]}>
      <FlatList
        ListHeaderComponent={
          <View style={[styles.searchTextInputContainer, styles.shadow4]}>
            <TextInput
              icon="search"
              placeholder="Search"
              style={styles.searchTextInput}
              containerStyle={commonStyles.container}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              onSubmitEditing={_onSearch}
            />
          </View>
        }
        stickyHeaderIndices={[0]}
        data={realm.objects('Manga').filtered(`title CONTAINS[c] "${query}"`)}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DownloadManga', {id: item.id});
            }}>
            <View
              style={{
                marginVertical: 4,
                padding: 8,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: scheme === 'dark' ? Colors.darkGray : '#fff',
                borderRadius: 8,

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}>
              <Image
                source={{uri: `https://mangadex.org/${item.cover_url}`}}
                style={{width: 40, height: 40, marginRight: 8, borderRadius: 4}}
              />
              <Text style={{flex: 1}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Library;
