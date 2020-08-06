/**
 * @format
 * @flow strict-local
 */

import React, {useEffect, useMemo} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {useCollapsibleStack} from 'react-navigation-collapsible';
import unescape from 'lodash.unescape';

import Text from '../../components/Text';
import styles from './styles';
import ChapterCard from '../../components/ChapterCard';
import {useRealm} from '../../context/RealmContext';

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
  const realm = useRealm();
  const {onScroll} = useCollapsibleStack();

  const {id} = route?.params ?? {id: null};
  const {status, error, data} = useQuery(
    id && ['manga', id],
    fetchMangaDetails,
  );

  const languages = useMemo(() => {
    if (!data?.chapter) {
      return [];
    }

    return [
      ...new Set(
        Object.keys(data.chapter).map((key) => data.chapter[key].lang_code),
      ),
    ];
  }, [data]);

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

        const currChapterUnescaped = {
          ...currChapter,
          title: unescape(currChapter.title),
          group_name: unescape(currChapter.group_name),
        };

        if (accChapter) {
          return [
            ...acc.filter(({chapter}) => chapter !== currChapter.chapter),
            currChapterUnescaped,
          ];
        }

        return [...acc, currChapterUnescaped];
      }, [])
      .sort((a, b) => b.chapter - a.chapter);
  }, [data]);

  useEffect(() => {
    if (status === 'success') {
      navigation.setOptions({
        headerTitle: unescape(data.manga.title),
        headerCover: `https://mangadex.org/${data.manga.cover_url}`,
      });
    }
  }, [status, navigation, data]);

  useEffect(() => {
    if (status === 'success') {
      realm.write(() => {
        realm.create(
          'Manga',
          {
            id,
            title: unescape(data.manga.title),
            cover_url: data.manga.cover_url,
          },
          'modified',
        );
      });
    }
  }, [id, status, data, realm]);

  if (!id) {
    return null;
  }

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'error') {
    return <Text>Error: {error.toString()}</Text>;
  }

  console.log(languages);

  return (
    <Animated.FlatList
      ListHeaderComponent={
        <View style={styles.downloadAllRow}>
          <TouchableOpacity>
            <Text style={styles.downloadAllText}>Download All</Text>
          </TouchableOpacity>
        </View>
      }
      data={chapters}
      contentContainerStyle={[styles.flatListContentContainer]}
      renderItem={({item}) => {
        return <ChapterCard {...item} id={item.key} />;
      }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      scrollIndicatorInsets={{top: 160}}
    />
  );
};

export default DownloadManga;
