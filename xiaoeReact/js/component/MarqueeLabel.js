/**
 * **************************************
 *
 * Text跑马灯效果实现，用于展示首页名字过长
 *
 * **************************************
 */
'use strict';

import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import AppDataConfig from '.././config/AppDataConfig';

export default class MarqueeLabel extends Component {

  state = {
    started: false // use state for this variable to make sure that any change would affect UI
  };

  componentWillMount() {
    this.animatedTransformX = new Animated.Value(0);
    this.bgViewWidth = 0;
    this.textWidth = 0;
    this.duration = 5000;
    this.shouldFinish = false;
  }

  componentWillUnmount() {
    this.shouldFinish = true;
  }

  textOnLayout(e) {
    this.textWidth = e.nativeEvent.layout.width;

    if (this.bgViewWidth !== 0) {
      this.prepareToAnimate();
    }
  }

  bgViewOnLayout(e) {
    this.bgViewWidth = e.nativeEvent.layout.width;

    if (this.textWidth !== 0) {
      this.prepareToAnimate();
    }
  }

  prepareToAnimate() {
    // Calculate this.duration by this.props.duration / this.props.speed
    // If this.props.duration is set, discard this.props.speed
    const { duration, speed } = this.props;
    if (duration !== undefined) {
      this.duration = duration;
    } else if (speed !== undefined) {
      this.duration = ((this.bgViewWidth + this.textWidth) / speed) * 1000;
    }

    this.animate();
  }

  animate() {
    this.animatedTransformX.setValue(this.bgViewWidth);
    if (!this.state.started) {
      this.setState({
        started: true
      });
    }
    Animated.timing(this.animatedTransformX, {
        toValue: -this.textWidth,
        duration: this.duration,
        useNativeDriver: true,
        easing: Easing.linear
    }).start((event) => {
      if(event.finished && !this.shouldFinish){
        this.animate()
      }
    });
  }

  render() {
    const {
      children,
      text,
      bgViewStyle, // Backgound View Custom Styles
      textStyle, // Text Custom Styles

      // Text Container Width:
      // to make the text shown in one line, this value should be larger than text width
      textContainerWidth = AppDataConfig.DEVICE_WIDTH_Dp,

      // Text Container Height:
      // to make the text shown in one line, this value should be larger than text height
      // usually increase this value when text has a large font size.
      textContainerHeight = 25,

      textContainerStyle // Text Container Custom Styles, not recommended to use
    } = this.props;

    const { started } = this.state;

    return (
      <View
        style={{ ...styles.bgViewStyle, ...bgViewStyle }}
        onLayout={(event) => this.bgViewOnLayout(event)}>
        <View
          style={{
            ...styles.textContainerStyle,
            width: textContainerWidth,
            height: textContainerHeight,
            opacity: started ? 1 : 0,
            ...textContainerStyle
          }}
        >
        <Animated.Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            transform: [{ translateX: this.animatedTransformX }],
            ...textStyle
          }}
          adjustsFontSizeToFit
          onLayout={(event) => this.textOnLayout(event)}
        >
          {children || text || ' '}
        </Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = {
  bgViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll',
    marginRight: AppDataConfig.DEVICE_WIDTH_Dp/4
  },
  textContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
};
