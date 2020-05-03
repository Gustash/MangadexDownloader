/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useMemo} from 'react';
import {View, Animated} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {useCollapsibleStack} from 'react-navigation-collapsible';

import Text from '../../components/Text';
import commonStyles from '../../styles/common';
import styles from './styles';
import ChapterCard from '../../components/ChapterCard';

type RouteParams = {
  id: string,
};

type Props = {
  navigation: NavigationProp,
  route: RouteProp<RouteParams>,
};

const fetchMangaDetails = async (_, id: string) => {
  const res = await fetch(`https://mangadex.org/api/?id=${id}&type=manga`);

  return res.json();
};

const DownloadManga: (props: Props) => React$Node = ({route, navigation}) => {
  const {onScroll, scrollIndicatorInsetTop} = useCollapsibleStack();

  const {id} = route?.params ?? {id: null};
  const {status, error, data} = useQuery(
    id && ['manga', id],
    fetchMangaDetails,
  );

  useEffect(() => {
    if (!id) {
      navigation.goBack();
    }
  }, [id, navigation]);

  useEffect(() => {
    if (status === 'success') {
      navigation.setOptions({
        headerTitle: data.manga.title,
        headerCover: `https://mangadex.org/${data.manga.cover_url}`,
      });
    }
  }, [status, navigation, data]);

  const chapters = useMemo(() => {
    if (!data?.chapter) {
      return [];
    }

    return Object.keys(data.chapter)
      .filter((key) => data.chapter[key].lang_code === 'gb')
      .map((key) => ({
        key,
        ...data.chapter[key],
      }))
      .reduce((acc, currChapter) => {
        const accChapter = acc.find(
          ({chapter}) => chapter === currChapter.chapter,
        );

        if (accChapter?.timestamp >= currChapter.timestamp) {
          return [
            ...acc.filter(({chapter}) => chapter !== currChapter.chapter),
            currChapter,
          ];
        }

        return [...acc, currChapter];
      }, [])
      .sort((a, b) => b.chapter - a.chapter);
  }, [data]);

  if (!id) {
    return null;
  }

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'error') {
    return <Text>Error: {error.toString()}</Text>;
  }

  return (
    <View style={commonStyles.container}>
      <Animated.FlatList
        data={chapters}
        contentContainerStyle={[styles.flatListContentContainer]}
        renderItem={({item}) => {
          return <ChapterCard {...item} />;
        }}
        onScroll={onScroll}
        scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
      />
    </View>
  );
};

export default DownloadManga;
