import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';

import { name as appName } from "./app.json";
import HomePage from "./src/feature/home/HomePage";

export default function Main() {
    return (
        <NavigationContainer>
            <PaperProvider>
                <HomePage />
            </PaperProvider>
        </NavigationContainer>
    );
}

AppRegistry.registerComponent(appName, () => Main);
