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
      'barlow-light': require('./assets/fonts/Barlow/Barlow-Light.ttf'),
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
            { data.meditationSessions.map((meditationSession) => (
              <Meditation
                key={meditationSession.title}
                disableScrolling={() => this.disableScrolling() }
                enableScrolling={() => this.enableScrolling() }
                toptitle={meditationSession.toptitle}
                title={meditationSession.title}
                audio={meditationSession.audio}
              />
            ))}
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

const data = {
  meditationSessions: [
    {
      toptitle: "Meditation 1",
      title: "First Meditation",
      audio: require('./assets/audio/1.mp3')
    },
    {
      toptitle: "Meditation 2",
      title: "Second Meditation",
      audio: require('./assets/audio/2.mp3')
    },
    {
      toptitle: "Meditation 3",
      title: "Third Meditation",
      audio: require('./assets/audio/3.mp3')
    },
    {
      toptitle: "Meditation 4",
      title: "Forth Meditation",
      audio: require('./assets/audio/4.mp3')
    },
    {
      toptitle: "Meditation 5",
      title: "Forth Meditation",
      audio: require('./assets/audio/5.mp3')
    },
    {
      toptitle: "Meditation 6",
      title: "Forth Meditation",
      audio: require('./assets/audio/6.mp3')
    },
    {
      toptitle: "Meditation 7",
      title: "Forth Meditation",
      audio: require('./assets/audio/7.mp3')
    },
    {
      toptitle: "Meditation 8",
      title: "Forth Meditation",
      audio: require('./assets/audio/8.mp3')
    },
    {
      toptitle: "Meditation 9",
      title: "Forth Meditation",
      audio: require('./assets/audio/9.mp3')
    },
    {
      toptitle: "Meditation 10",
      title: "Forth Meditation",
      audio: require('./assets/audio/10.mp3')
    },
  ]
}

// TODO:
// 1. mp3s verkleinern und hochladen
// 2. titel vergeben
// 3. Allenfalls grafiken hinzufügen
