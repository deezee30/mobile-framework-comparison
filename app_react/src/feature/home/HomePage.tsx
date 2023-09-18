import { useState } from 'react';
import { Appbar, DefaultTheme, Switch, Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeDataRepository, HomeDataRandomGeneratorService } from './HomeData';
import HomeTabViewContainer from './HomeTabViewContainer';
import { Dimensions } from 'react-native';

const CHART_MIN_X: number = 0;
const CHART_MAX_X: number = 100;
const CHART_MIN_Y: number = 0;
const CHART_MAX_Y: number = 10;

const Tab = createMaterialTopTabNavigator();

const HomePage = () => {
    const [simulateAsync, setSimulateAsync] = useState(false);

    const generator: HomeDataRepository = new HomeDataRandomGeneratorService({
        size: 500,
        minX: CHART_MIN_X,
        maxX: CHART_MAX_X,
        minY: CHART_MIN_Y,
        maxY: CHART_MAX_Y,
        simulateAsync: simulateAsync,
    });

    return (<>
        <Appbar.Header>
            <Appbar.Content title="App React Native" />
            <Text>Simulate Async</Text>
            <Switch
                value={simulateAsync}
                onValueChange={setSimulateAsync}
            />
        </Appbar.Header>
        <Tab.Navigator
            initialLayout={{
                width: Dimensions.get('window').width,
            }}
            screenOptions={{
                lazy: true,
                tabBarIndicatorStyle: {
                    backgroundColor: DefaultTheme.colors.primary,
                },
              }}
        >
            <Tab.Screen
                name="Tab 1"
                component={TabView1}
                initialParams={{ repository: generator }}
            />
            <Tab.Screen
                name="Tab 2"
                component={TabView2}
                initialParams={{ repository: generator }}
            />
        </Tab.Navigator>
    </>);
}

export default HomePage;

const TabView1 = (props: any) => (
    <HomeTabViewContainer
        title='Tab View 1'
        repository={props.route.params.repository}
    >
        <Text>TODO: Graph 1</Text>
    </HomeTabViewContainer>
);

const TabView2 = (props: any) => (
    <HomeTabViewContainer
        title='Tab View 2'
        repository={props.route.params.repository}
    >
        <Text>TODO: Graph 2</Text>
    </HomeTabViewContainer>
);