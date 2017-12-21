import React, {Component} from 'react';
import { Text, Image, View, TouchableWithoutFeedback, NativeModules, LayoutAnimation, TouchableHighlight, Dimensions} from 'react-native';
import AudioPlayer from '../atoms/audioplayer'
import styled from 'styled-components/native'

const { UIManager } = NativeModules;

//This is needed for Android, or Animations will not work properly
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Meditation extends Component {

  originalValues = { margin: "10", borderRadius: "10", height: "auto", padding: "20", width: "auto", position: "relative", top: "auto", zIndex:"0", disabled: false}

  state = this.originalValues

  onPressOutButton(){
    LayoutAnimation.spring();
    this.setState({ margin: "10" })
  }

  onPressInButton(){
    LayoutAnimation.spring();
    this.setState({ margin: "15" })
  }

  onPressButton(){
    this.props.disableScrolling()
    // TODO: The last elements do not work yet properly
    this.refs.meditate.root.measure((xPos, yPos) => {
      this.refs.meditate.root.measureInWindow((xRelPos, yRelPos) => {
        LayoutAnimation.spring();
        const pos = yPos - yRelPos - 10 //10 is because of original margin
        const { height } = Dimensions.get('window');
        this.setState({ margin: "0", borderRadius: "0", height: height, width: "100%", padding: "20", top: pos, position: "absolute", zIndex:"10", disabled: true })
    })
   })
  }

  resetToNormal(){
    this.props.enableScrolling()
    LayoutAnimation.spring()
    this.setState(this.originalValues)
  }

  render() {
    return (
      <Cards zIndexValue={this.state.zIndex}>
        <TouchableWithoutFeedback
          onPressIn={() => this.onPressInButton()}
          onPressOut={() => this.onPressOutButton()}
          onPress={() => this.onPressButton()}
          disabled={this.state.disabled}
        >
          <MeditationSession
            ref="meditate"
            marginValue={this.state.margin}
            paddingValue={this.state.padding}
            borderRadiusValue={this.state.borderRadius}
            heightValue={this.state.height}
            widthValue={this.state.width}
            positionValue={this.state.position}
            topValue={this.state.top}
          >
            {this.state.disabled &&
              /* Close Icon */
              <TouchableWithoutFeedback onPress={()=>this.resetToNormal()}  disabled={!this.state.disabled}>
                <Image source={require('../../assets/images/close.png')} />
              </TouchableWithoutFeedback>
            }
            <UpTitle disabled={!this.state.disabled}>MEDITATION 1</UpTitle>
            <Title>This is the Title for the Audio</Title>
            <AudioHide  disabled={!this.state.disabled} >
              <AudioPlayer/>
            </AudioHide>
          </MeditationSession>
        </TouchableWithoutFeedback>
      </Cards>
    );
  }
}

const AudioHide = styled.View`
  height: ${props => props.disabled ? "0px" : "150px"};
  overflow: hidden;
`

const Cards = styled.View`
  height:400px;
  z-index: ${props => props.zIndexValue}
`
const MeditationSession = styled.View`
  position: ${props => props.positionValue};
  top: ${props => props.topValue};
  padding: ${props => props.paddingValue}px;
  margin: ${props => props.marginValue}px;
  background: white;
  border-radius: ${props => props.borderRadiusValue}px;
  height: ${props => props.heightValue};
  width: ${props => props.widthValue};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 20px;
`
const Title = styled.Text`
  font-size: 30px;
  font-family: 'barlow-bold';
  padding-top: 0px;
  padding-bottom: 0px;
`
const UpTitle = styled.Text`
  font-family: 'barlow-medium'
  font-size: 14px;
  padding-top: ${props => props.disabled ? "10px" : "100px"};
  padding-bottom: 5px;
`
const Description = styled.Text`
  font-size: 17px;
  padding-bottom: 10px;
`
