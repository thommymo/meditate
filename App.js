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
  padding-top:50px;
  padding-bottom: 30px;
`
const StatusBarView = styled.View`
  height: ${Constants.statusBarHeight};
  background: white;
`

//TODO: Move this into GraphCMS

const data = {
  meditationSessions: [
    {
      toptitle: "Meditation 1",
      title: "Stabilität 1",
      audio: require('./assets/audios/1.mp3'),
    },
    {
      toptitle: "Meditation 2",
      title: "Stabilität 2",
      audio: require('./assets/audios/2.mp3')
    },
    {
      toptitle: "Meditation 3",
      title: "Stabilität 3",
      audio: require('./assets/audios/3.mp3')
    },
    {
      toptitle: "Meditation 4",
      title: "Forth Meditation",
      audio: require('./assets/audios/4.mp3')
    },
    {
      toptitle: "Meditation 5",
      title: "Vergänglichkeit?",
      audio: require('./assets/audios/5.mp3')
    },
    {
      toptitle: "Meditation 6",
      title: "empathische Freude",
      audio: require('./assets/audios/6.mp3')
    },
    {
      toptitle: "Meditation 7",
      title: "Mitgefühl, Wohlwollen, liebende Güte",
      audio: require('./assets/audios/7.mp3')
    },
    {
      toptitle: "Meditation 8",
      title: "Bewusstheit",
      audio: require('./assets/audios/8.mp3')
    },
    {
      toptitle: "Meditation 9",
      title: "Gelassenheit",
      audio: require('./assets/audios/9.mp3')
    },
    {
      toptitle: "Meditation 10",
      title: "Licht",
      audio: require('./assets/audios/10.mp3')
    },
  ]
}
