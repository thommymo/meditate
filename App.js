import React from 'react';
import { ScrollView } from 'react-native';
import Meditation from './components/molecules/meditation'
import styled from 'styled-components/native'


export default class App extends React.Component {

  render() {
    return (
      <ScrollView>
        <Meditation/>
        <Meditation/>
        <Meditation/>
        <Meditation/>
        <Meditation/>
        <Meditation/>
        <Meditation/>
        
      </ScrollView>
    );
  }
}
