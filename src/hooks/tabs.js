/**
 * @format
 * @flow strict-local
 */
import React, {useMemo} from 'react';
import {FlashyTabConfig, TabsConfig} from '@gorhom/animated-tabbar';
import Colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useColorScheme} from 'react-native-appearance';

export const useTabs: () => TabsConfig<FlashyTabConfig> = () => {
  const scheme = useColorScheme();

  return useMemo(() => {
    const iconColor =
      scheme === 'dark' ? Colors.mangadexComplimentary : Colors.darkGray;

    return {
      Library: {
        labelStyle: {
          color: Colors.mangadexBranding,
        },
        icon: {
          component: ({animatedFocus, ...props}) => (
            <FontAwesome5 name="book" {...props} />
          ),
          color: iconColor,
        },
      },
      Settings: {
        labelStyle: {
          color: Colors.mangadexBranding,
        },
        icon: {
          component: ({animatedFocus, ...props}) => (
            <FontAwesome5 name="cog" {...props} />
          ),
          color: iconColor,
        },
      },
    };
  }, [scheme]);
};
