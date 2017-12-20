import React from 'react';
import { ScrollView } from 'react-native';
import Meditation from './components/molecules/meditation'
import styled from 'styled-components/native'


export default class App extends React.Component {

  state = { scrollEnabled: true }

  disableScrolling(){
    this.setState({scrollEnabled: false})
  }

  enableScrolling(){
    this.setState({scrollEnabled: true})
  }

  render() {
    return (
      <ScrollView scrollEnabled={this.state.scrollEnabled}>
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
        <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
      </ScrollView>
    );
  }
}
