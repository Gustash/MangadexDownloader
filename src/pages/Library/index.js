/**
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import TextInput from '../../components/TextInput';
import commonStyles from '../../styles/common';
import styles from './styles';

type Props = {
  navigation: NavigationProp,
};

const Library: (props: Props) => React$Node = ({navigation}) => {
  const [query, setQuery] = useState('');

  const _onSearch = useCallback(() => {
    navigation.navigate('Search', {query});
  }, [navigation, query]);

  return (
    <SafeAreaView
      style={[commonStyles.container, commonStyles.containerSpacing]}>
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
        data={[]}
        renderItem={() => null}
      />
    </SafeAreaView>
  );
};

export default Library;
