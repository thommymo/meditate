import React, { Component } from 'react'
import { Text, View, ProgressViewIOS, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import { Svg } from 'expo'

export default class AudioPlayer extends Component {
  state = {
    playbackStatus: "notloaded",
    duration: 0,
    position: 0
  }
  constructor(){
    super()
    this.soundObject = new Expo.Audio.Sound()
  }
  componentDidMount(){
    const onPlaybackStatusUpdate = (playbackStatus) => {
      this.setState( {position: Math.floor(playbackStatus.positionMillis/1000+1) })
      this.setState( {duration: (playbackStatus.durationMillis/1000) })
    }
    this.soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
  }
  stopPlaying(){
    this.setState( { playbackStatus: "Stopped!" })
    this.soundObject.stopAsync()
    this.startPlaying();
  }
  async startPlaying(){
    this.setState( { playbackStatus: "playing" })
    //Set behaviour of Audio playback
    await Expo.Audio.setAudioModeAsync({
      playsInSilentModeIOS: true, //plays in silent mode
      allowsRecordingIOS: false, //doesn't allow recording
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS, //does interrupt other audio from other player
      shouldDuckAndroid: true,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX //does interrupt other audio from other player
    })
    await this.soundObject.playAsync()
  }
  pausePlaying(){
    this.setState( { playbackStatus: "pausing" })
    this.soundObject.pauseAsync()
  }
  loadAudio(){
    if(this.state.playbackStatus === "notloaded"){
      this.setState( { playbackStatus: "loaded" })
      this.soundObject.loadAsync(this.props.audio, {}, true)
        .then(() => this.startPlaying())
    }else{
      this.startPlaying()
    }
  }
  render() {
    var minutes = Math.floor(this.state.position/60)
    var seconds10 = Math.floor(this.state.position%60/10)
    var seconds = this.state.position%10
    return (
      <View>
        <HorizontalView>
          { (this.state.playbackStatus === "loaded" || this.state.playbackStatus === "pausing" || this.state.playbackStatus === "notloaded") &&
            <TouchableWithoutFeedback onPress={() => { this.loadAudio()}}>
              <Svg
                height="40"
                width="60"
              >
                <Svg.Path d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266
                  c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267
                  l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z" scale={0.15}/>
              </Svg>
            </TouchableWithoutFeedback>
          }

          { (this.state.playbackStatus === "pausing") &&
            <TouchableWithoutFeedback onPress={() => { this.stopPlaying()}}>
              <Svg
                height="40"
                width="40"
              >
                <Svg.Path d="M120.774,179.271v40c47.303,0,85.784-38.482,85.784-85.785c0-47.3-38.481-85.782-85.784-85.782H89.282L108.7,28.286
                  L80.417,0L12.713,67.703l67.703,67.701l28.283-28.284L89.282,87.703h31.492c25.246,0,45.784,20.538,45.784,45.783
                  C166.558,158.73,146.02,179.271,120.774,179.271z" scale={0.15}/>
              </Svg>
            </TouchableWithoutFeedback>
          }
        </HorizontalView>

        { (this.state.playbackStatus === "playing") &&
          <TouchableWithoutFeedback onPress={() => { this.pausePlaying()}}>
            <Svg
              height="40"
              width="40"
            >
              <Svg.Path d="M80.543,0H35.797c-9.885,0-17.898,8.014-17.898,17.898v196.883
                c0,9.885,8.013,17.898,17.898,17.898h44.746c9.885,0,17.898-8.013,17.898-17.898V17.898C98.44,8.014,90.427,0,80.543,0z M196.882,0
                h-44.746c-9.886,0-17.899,8.014-17.899,17.898v196.883c0,9.885,8.013,17.898,17.899,17.898h44.746
                c9.885,0,17.898-8.013,17.898-17.898V17.898C214.781,8.014,206.767,0,196.882,0z" scale={0.15}/>
            </Svg>
          </TouchableWithoutFeedback>
        }

        {(this.state.playbackStatus === "loaded" ||  this.state.playbackStatus === "Stopped!") && this.state.duration>0 &&
          <Duration>{Math.floor(this.state.duration/60)}:{Math.floor(this.state.duration%60)}min</Duration>
        }
        {(this.state.playbackStatus === "playing" || this.state.playbackStatus === "pausing")&&
          <Duration>{minutes}:{seconds10}{seconds}min</Duration>
        }
      </View>
    )
  }
}
const HorizontalView = styled.View`
  display: flex;
  flex-direction: row;
`
const Duration = styled.Text`
  font-family: 'barlow-light'
  font-size: 14px;
  padding-top: 10px;
`
const Stop = styled.Button`
  width: 50px;
  height: 50px;
  background-color: blue;
`
const Play = styled.Button`
  margin-top:-100px;
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
