import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './stores/store';
import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
    console.log("Store : ",Store);
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                    >
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                        />
                </Stack.Navigator>
            </NavigationContainer>
         </Provider>
    )
}

export default App;