/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, Animated, useWindowDimensions} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {createCollapsibleStack} from 'react-navigation-collapsible';

import Library from './src/pages/Library';
import Settings from './src/pages/Settings';
import {useTabs} from './src/hooks/tabs';
import tabStyles from './src/styles/tabs';
import Search from './src/pages/Search';
import DownloadManga from './src/pages/DownloadManga';
import Header from './src/components/Header';
import {extractHeaderTitle} from './src/helpers/navigation';
import {RealmProvider} from './src/context/RealmContext';
import schema from './src/schema';

const Tabs = createBottomTabNavigator();
const RootStack = createStackNavigator();
const LibraryStack = createStackNavigator();

const LibraryNavigator: () => React$Node = () => {
  const {width} = useWindowDimensions();

  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryList"
        component={Library}
        options={{headerShown: false, headerTitle: 'Library'}}
      />
      {createCollapsibleStack(
        <LibraryStack.Screen
          name="DownloadManga"
          component={DownloadManga}
          options={{
            headerTitle: 'Download',
            headerStyle: {
              height: 200,
            },
            header: ({scene, previous, navigation, insets}) => {
              const {headerCover} = scene.descriptor.options;

              const progress = Animated.add(
                scene.progress.current,
                scene.progress.next || 0,
              );

              const opacity = progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 1, 0],
              });

              const translateX = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [width, 0],
                extrapolate: 'clamp',
              });

              return (
                <Header
                  insets={insets}
                  title={extractHeaderTitle(scene)}
                  leftIcon={previous && 'arrow-left'}
                  onLeftIconPress={navigation.goBack}
                  style={{opacity, transform: [{translateX}]}}
                  cover={{uri: headerCover}}
                />
              );
            },
          }}
        />,
      )}
    </LibraryStack.Navigator>
  );
};

const HomepageNavigator: () => React$Node = () => {
  const scheme = useColorScheme();
  const tabs = useTabs();

  return (
    <Tabs.Navigator
      tabBar={(props) => (
        <AnimatedTabBar
          tabs={tabs}
          preset="flashy"
          style={scheme === 'dark' ? tabStyles.dark : tabStyles.light}
          {...props}
        />
      )}>
      <Tabs.Screen name="Library" component={LibraryNavigator} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const App: () => React$Node = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <RealmProvider schema={schema} schemaVersion={4}>
      <AppearanceProvider>
        <StatusBar
          translucent
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer theme={theme}>
          <RootStack.Navigator
            mode="modal"
            screenOptions={{
              header: ({scene, previous, navigation, insets}) => {
                return (
                  <Header
                    insets={insets}
                    title={extractHeaderTitle(scene)}
                    leftIcon={previous && 'times'}
                    onLeftIconPress={navigation.goBack}
                  />
                );
              },
            }}>
            <RootStack.Screen
              name="Homepage"
              component={HomepageNavigator}
              options={{headerShown: false}}
            />
            <RootStack.Screen name="Search" component={Search} />
          </RootStack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </RealmProvider>
  );
};

export default App;
