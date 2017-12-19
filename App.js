import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = { playbackStatus: "Not Loaded!" }
    this.soundObject = new Expo.Audio.Sound()
  }
  componentDidMount(){
    //const source = require('./assets/10-MenschWerdeWesentlich2017.MP3')
    const onPlaybackStatusUpdate = (playbackStatus) => {

      if (playbackStatus.isPlaying) {
        this.setState( { playbackStatus: "Playing!" })
      }
      this.setState( {position: Math.floor(playbackStatus.positionMillis/1000+1) })
      this.setState( {duration: (playbackStatus.durationMillis/1000/60) })
    }

    this.soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
  }
  stopPlaying(){
    this.setState( { playbackStatus: "Stopped!" })
    this.soundObject.stopAsync()
  }
  startPlaying(){
    this.setState( { playbackStatus: "Playing!" })
    this.soundObject.playAsync()
  }
  pausePlaying(){
    this.setState( { playbackStatus: "Paused!" })
    this.soundObject.pauseAsync()
  }
  loadAudio(){
    this.setState( { playbackStatus: "Loading!" })
    this.soundObject.loadAsync(require('./assets/10.mp3'), {}, true)
  }
  render() {
    return (
      <View>
        <StyledText>Open up App.js to start working on your app!</StyledText>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>{this.state.playbackStatus}</Text>
        <Text>{this.state.position}</Text>
        <Text>{this.state.duration}</Text>
        <Load onPress={() => { this.loadAudio() }} title="load"></Load>
        <Stop onPress={() => { this.stopPlaying() }} title="stop"></Stop>
        <Play onPress={() => { this.startPlaying()}} title="play"></Play>
        <Pause onPress={() => { this.pausePlaying()}} title="pause"></Pause>
      </View>
    );
  }
}
const StyledText = styled.Text`
  text-align: right;
`
const Stop = styled.Button`
  width: 50px;
  height: 50px;
  background-color: blue;
`
const Play = styled.Button`
  width: 50px;
  height: 50px;
  background-color: red;
`
const Pause = styled.Button`
  width: 50px;
  height: 50px;
  background-color: violet;
`
const Load = styled.Button`
  width: 50px;
  height: 50px;
  background-color: violet;
`
