/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

import Library from './src/pages/Library';
import Settings from './src/pages/Settings';
import {useTabs} from './src/hooks/tabs';
import tabStyles from './src/styles/tabs';

const Tabs = createBottomTabNavigator();

const App: () => React$Node = () => {
  const scheme = useColorScheme();
  const tabs = useTabs();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <AppearanceProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={theme}>
        <Tabs.Navigator
          tabBar={(props) => (
            <AnimatedTabBar
              tabs={tabs}
              preset="flashy"
              style={scheme === 'dark' ? tabStyles.dark : tabStyles.light}
              {...props}
            />
          )}>
          <Tabs.Screen name="Library" component={Library} />
          <Tabs.Screen name="Settings" component={Settings} />
        </Tabs.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
