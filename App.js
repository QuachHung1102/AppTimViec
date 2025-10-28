import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from "react";

import PreLoad from "./screens/PreLoad";
import LogReg from './screens/LogReg';
import Home from "./screens/Home";
import Tab from "./assets/BottomTab";
import User from './screens/User';
import Setting from './screens/Setting';
import Notification from './screens/Notification';
import NewJob from './screens/NewJob';
import JobDetail from './screens/JobDetail';
import CompanyDetail from './screens/companyDetail';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PreLoad" component={PreLoad} />
          <Stack.Screen name="LogReg" component={LogReg} />
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="NewJob" component={NewJob} />
          <Stack.Screen name="JobDetail" component={JobDetail} />
          <Stack.Screen name="CompanyDetail" component={CompanyDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}