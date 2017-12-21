import React from 'react';
import { ScrollView, Text, View, StatusBar } from 'react-native';
import Meditation from './components/molecules/meditation'
import styled from 'styled-components/native'
import { Font, Constants } from 'expo'


export default class App extends React.Component {

  state = { scrollEnabled: true, fontLoaded: false }

  async componentDidMount(){
    await Font.loadAsync({
      'barlow-bold': require('./assets/fonts/Barlow/Barlow-Bold.ttf'),
      'barlow-medium': require('./assets/fonts/Barlow/Barlow-Medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  disableScrolling(){
    this.setState({scrollEnabled: false})
  }

  enableScrolling(){
    this.setState({scrollEnabled: true})
  }

  render() {
    return (

      <ScrollView scrollEnabled={this.state.scrollEnabled}>
        { this.state.fontLoaded ? (
          <View>
            <StatusBarView>
              <StatusBar
                translucent
                backgroundColor="white"
                barStyle="dark-content"
                hidden={!this.state.scrollEnabled}
                showHideTransition="slide"
              />
            </StatusBarView>
            <Title>Mensch werde wesentlich</Title>
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
            <Meditation disableScrolling={() => this.disableScrolling() } enableScrolling={() => this.enableScrolling() } />
          </View>
        ) : null }
      </ScrollView>
    );
  }
}

const Title = styled.Text`
  font-family: 'barlow-bold';
  font-size: 30px;
  padding-left: 10px;
  padding-top:20px;
  padding-bottom: 10px;
`
const StatusBarView = styled.View`
  height: ${Constants.statusBarHeight};
  background: white;
`
