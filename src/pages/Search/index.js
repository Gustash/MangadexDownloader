/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import WebView from 'react-native-webview';
import url from 'url';
import {NavigationProp, RouteProp} from '@react-navigation/native';

type RouteParams = {
  query: string,
};

type Props = {
  navigation: NavigationProp,
  route: RouteProp<RouteParams>,
};

const Search: (props: Props) => React$Node = ({navigation, route}) => {
  const [handling, setHandling] = useState(false);
  const {query} = route.params;

  return (
    <WebView
      source={{uri: encodeURI(`https://mangadex.org/search?title=${query}`)}}
      onNavigationStateChange={(navState) => {
        const uri = url.parse(navState.url);
        const [, page, id] = uri.pathname.split('/');

        if (page === 'title' && !handling) {
          setHandling(true);
          navigation.pop();
          navigation.navigate('Library', {
            screen: 'DownloadManga',
            params: {id},
            initial: false,
          });
        }
      }}
    />
  );
};

export default Search;
