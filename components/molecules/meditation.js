import React, {Component} from 'react';
import { Text, View, TouchableWithoutFeedback, NativeModules, LayoutAnimation, TouchableHighlight, Dimensions} from 'react-native';
import AudioPlayer from '../atoms/audioplayer'
import styled from 'styled-components/native'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Meditation extends Component {
  state = { margin: "10", borderRadius: "10", height: "auto", padding: "20", position: "relative", top: "auto", zIndex:"0"}
  onPressOutButton(){
    LayoutAnimation.spring();
    //this.setState({w: this.state.w + 15, h: this.state.h + 15}) // example for more values
    this.setState({ margin: "10" })
  }
  onPressInButton(){
    LayoutAnimation.spring();
    this.setState({ margin: "15" })
  }

  onPressButton(){
    this.refs.meditate.root.measure((xPos, yPos) => {
      this.refs.meditate.root.measureInWindow((xRelPos, yRelPos) => {
        LayoutAnimation.spring();
        const pos = yPos - yRelPos - 10 //10 is because of original margin
        const {height} = Dimensions.get('window');
        console.log(height);
        this.setState({ margin: "0", borderRadius: "0", height: height, padding: "20", top: pos, position: "absolute", zIndex:"10" })
    })
   })


    //this.setState({w: this.state.w + 15, h: this.state.h + 15}) // example for more values


  }

  resetToNormal(){
    LayoutAnimation.spring();
    this.setState({ margin: "10", borderRadius: "10", height: "auto", padding: "20", position: "relative", top: "auto", zIndex:"0"})
  }
  render() {
    return (
        <TouchableWithoutFeedback
          onPressIn={() => this.onPressInButton()}
          onPressOut={() => this.onPressOutButton()}
          onPress={() => this.onPressButton()}
        >
          <MeditationSession
            ref="meditate"
            marginValue={this.state.margin}
            paddingValue={this.state.padding}
            borderRadiusValue={this.state.borderRadius}
            heightValue={this.state.height}
            positionValue={this.state.position}
            topValue={this.state.top}
            zIndex={this.state.zIndex}
          >
            <Titel>This is the Title for the Audio</Titel>
            <Description>This is the Description for the Audio</Description>
            <AudioPlayer />
            <TouchableHighlight onPress={()=>this.resetToNormal()}><Text>Close</Text></TouchableHighlight>
          </MeditationSession>
        </TouchableWithoutFeedback>
    );
  }
}


MeditationSession = styled.View`
  position: ${props => props.positionValue};
  top: ${props => props.topValue};
  padding: ${props => props.paddingValue}px;
  margin: ${props => props.marginValue}px;
  background-color: #f06292;
  border-radius: ${props => props.borderRadiusValue}px;
  height: ${props => props.heightValue};
  width: ${props => props.heightValue};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
  z-index: ${props => props.zIndex};
`
Titel = styled.Text`
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`
Description = styled.Text`
  font-size: 17px;
  padding-bottom: 10px;
`
