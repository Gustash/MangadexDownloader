/**
 * @format
 * @flow strict-local
 */
import React, {useMemo, useEffect} from 'react';
import {View, TouchableOpacity, ActivityIndicator, Linking} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useQuery} from 'react-query';

import Text from '../Text';
import Divider from '../Divider';
import styles from './styles';
import Colors from '../../styles/colors';
import {useRealm} from '../../context/RealmContext';

type Props = {
  volume?: string,
  chapter: string,
  title: string,
  group_name: string,
  id: string,
};

const fetchChapterDetails = async (_, id: string) => {
  const res = await fetch(
    `https://mangadex.org/api/?id=${id}&server=null&type=chapter`,
  );

  return res.json();
};

const ChapterCard: (props: Props) => React$Node = ({
  volume,
  chapter,
  title,
  group_name,
  id,
}) => {
  const realm = useRealm();
  const {status, error, data, refetch, isFetching} = useQuery(
    id && ['chapter', id],
    fetchChapterDetails,
    {
      manual: true,
    },
  );

  const scheme = useColorScheme();

  const isExternal = data?.status === 'external';

  const icon = useMemo(() => {
    if (isFetching) {
      return <ActivityIndicator size={20} color={Colors.mangadexBranding} />;
    }

    if (isExternal) {
      return (
        <FontAwesome5
          name="external-link-alt"
          size={16}
          color={Colors.mangadexBranding}
          style={styles.download}
        />
      );
    }

    if (data) {
      return (
        <FontAwesome5
          name="arrow-circle-right"
          size={20}
          color={Colors.mangadexBranding}
          style={styles.download}
        />
      );
    }

    return (
      <FontAwesome5
        name="arrow-circle-down"
        size={20}
        color={Colors.mangadexComplimentary}
        style={styles.download}
      />
    );
  }, [isExternal, isFetching, data]);

  useEffect(() => {
    if (status === 'success' && data) {
      realm.write(() => {
        const [manga] = realm
          .objects('Manga')
          .filtered(`id = "${data.manga_id}"`);
        const realmChapter = realm.create(
          'Chapter',
          {
            id,
            title,
            group_name,
            chapter: parseInt(chapter, 10),
            volume: volume ? parseInt(volume, 10) : null,
            manga,
          },
          'modified',
        );

        manga.chapters.push(realmChapter);
      });
    }
  }, [status, data, realm, title, id, group_name, chapter, volume]);

  return (
    <TouchableOpacity
      onPress={
        data
          ? () => {
              if (isExternal) {
                return Linking.openURL(data.external);
              }

              console.log(data);
            }
          : refetch
      }>
      <View
        style={[
          styles.container,
          styles.shadow,
          scheme === 'dark' && styles.containerDark,
        ]}>
        {volume ? (
          <>
            <View>
              <Text style={[styles.title, styles.centerText]}>Vol.</Text>
              <Text style={[styles.smallText, styles.centerText]}>
                {volume}
              </Text>
            </View>
            <Divider vertical />
          </>
        ) : null}
        <View>
          <Text style={[styles.title, styles.centerText]}>Ch.</Text>
          <Text style={[styles.smallText, styles.centerText]}>{chapter}</Text>
        </View>
        <Divider vertical />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.smallText}>{group_name}</Text>
        </View>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default ChapterCard;
