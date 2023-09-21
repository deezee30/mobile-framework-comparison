import { ReactNode, useState } from 'react';
import { Dimensions } from 'react-native';
import { Appbar, DefaultTheme, Switch, Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeDataRepository, HomeDataRandomGeneratorService } from './HomeData';
import HomeTabViewContainer from './HomeTabViewContainer';

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
                component={TabView(generator)}
                initialParams={{ title: 'Tab View 1' }}
            />
            <Tab.Screen
                name="Tab 2"
                component={TabView(generator)}
                initialParams={{ title: 'Tab View 2' }}
            />
        </Tab.Navigator>
    </>);
}

export default HomePage;

const TabView = (repo: HomeDataRepository) => (props: any) => {
    const title: string = props.route.params.title;

    const ChartView = (data: [number, number][]): ReactNode => {
        return (<>
            // TODO: Chart
        </>);
    };

    return (
        <HomeTabViewContainer
            title={title}
            repository={repo}
            builder={ChartView}
        />
    );
};