import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

export default class AudioPlayer extends Component {
  constructor(){
    super()
    this.state = { playbackStatus: "Not Loaded!" }
    this.soundObject = new Expo.Audio.Sound()
  }
  componentDidMount(){
    const onPlaybackStatusUpdate = (playbackStatus) => {

      if (playbackStatus.isPlaying) {
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
    this.setState( { playbackStatus: "playing" })
    this.soundObject.playAsync()
  }
  pausePlaying(){
    this.setState( { playbackStatus: "pausing" })
    this.soundObject.pauseAsync()
  }
  loadAudio(){
    this.setState( { playbackStatus: "Loading!" })
    this.soundObject.loadAsync(require("../../assets/10.mp3"), {}, true)
  }
  render() {
    return (
      <MainView>
        <Text>{this.state.playbackStatus}</Text>
        <Text>{this.state.position}</Text>
        <Text>{this.state.duration}</Text>
        <Load onPress={() => { this.loadAudio() }} title="load"></Load>
        <Stop onPress={() => { this.stopPlaying() }} title="stop"></Stop>
        <Play onPress={() => { this.startPlaying()}} title="play"></Play>
        <Pause onPress={() => { this.pausePlaying()}} title="pause"></Pause>
      </MainView>
    )
  }
}

const MainView = styled.View`
  background: grey;
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
