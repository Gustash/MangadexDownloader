/**
 * @format
 * @flow strict-local
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import Realm from 'realm';
import {View, ActivityIndicator} from 'react-native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import type {ObjectSchema} from 'realm';

import commonStyles from '../styles/common';
import {useColorScheme} from 'react-native-appearance';

export const RealmContext = createContext();

export const useRealm: () => Realm = () => useContext(RealmContext);

type Props = {
  children: React$Node,
  schema: [ObjectSchema],
  schemaVersion: number,
};

export const RealmProvider: (props: Props) => React$Node = ({
  children,
  schema,
  schemaVersion,
}) => {
  const scheme = useColorScheme();
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (!realm) {
      Realm.open({schema, schemaVersion}).then((_realm) => {
        setRealm(_realm);
      });
    }

    return () => {
      if (!realm?.isClosed) {
        realm?.close();
      }
    };
  }, [realm, schema, schemaVersion]);

  return (
    <RealmContext.Provider value={realm}>
      {realm ? (
        <View
          style={[
            commonStyles.container,
            {
              backgroundColor:
                scheme === 'dark'
                  ? DarkTheme.colors.background
                  : DefaultTheme.colors.background,
            },
          ]}>
          {children}
        </View>
      ) : (
        <View style={[commonStyles.container, commonStyles.centerContents]}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </RealmContext.Provider>
  );
};
