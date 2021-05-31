import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddressForm from './components/AddressForm';
import EmptyScreen from './components/EmptyScreen';

export type RootStackParamList = {
  Address: undefined; // undefined because you aren't passing any params to the address screen
  EmptyScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Address"
          component={AddressForm}
          options={{headerShown: false}}
        />
        <Stack.Screen name="EmptyScreen" component={EmptyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
