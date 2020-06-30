
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
// A very simple store
let store = createStore(combineReducers({count: counter}));

const CounterOnly = (props) => (
  <Text style={{fontSize: 22}}>COUNT: [{props.count}]</Text>
)
const BR = () => (<Text> </Text>)

// Screen 1
function Counter1({count, dispatch, navigation}) {
  return (
    <View>
      <Text style={{color: 'red'}}>r01, K6U</Text>
      <BR/>
      <CounterOnly count={count} />
      <BR/>
      <Button title="Increment" onPress={() => dispatch({type: 'INCREMENT'})} />
      <BR/>
      <Button title="Decrement" onPress={() => dispatch({type: 'DECREMENT'})} />
      <BR/>
      <Button
        title="Go to Counter 2"
        onPress={() => navigation.navigate('Counter2')}
      />
    </View>
  );
}

// Screen 2
function Counter2({count, dispatch, navigation}) {
  return (
    <View>
      <CounterOnly count={count} />
      <Button title="Increment" onPress={() => dispatch({type: 'INCREMENT'})} />
      <Button
        title="Go back..."
        onPress={() => navigation.navigate('Counter1')}
      />
    </View>
  );
}
// Connect the screens to Redux
let Counter1Container = connect((state) => ({count: state.count}))(Counter1);
let Counter2Container = connect((state) => ({count: state.count}))(Counter2);

// Create our stack navigator
let RootStack = createStackNavigator();

// Render the app container component with the provider around it
function App({route}) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Counter1" component={Counter1Container} />
          <RootStack.Screen name="Counter2" component={Counter2Container} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
