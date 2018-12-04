/**
 * Text
 *
     <Text h1>Hello World</Text>
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

// Consts and Libs
import { AppStyles } from '../../theme/';

/* Component ==================================================================== */
class CustomText extends Component {


  static defaultProps = {
    h1: false,
    h2: false,
    h3: false,
    h4: false,
    h5: false,
    p: false,
    onPress: null,
    style: null,
    children: null,
  }

  textProps = () => {
    // Defaults
    const props = {
      ...this.props,
      style: [AppStyles.baseText],
    };

    if (this.props.p) props.style = [AppStyles.p];
    if (this.props.h1) props.style = [AppStyles.h1];
    if (this.props.h2) props.style = [AppStyles.h2];
    if (this.props.h3) props.style = [AppStyles.h3];
    if (this.props.h4) props.style = [AppStyles.h4];
    if (this.props.h5) props.style = [AppStyles.h5];
    if (this.props.onPress) props.style.push(AppStyles.link);

    if (this.props.style) {
      props.style.push(this.props.style);
    }

    return props;
  }

  render = () => <Text {...this.textProps()}>{this.props.children}</Text>;
}

/* Export Component ==================================================================== */
export default CustomText;
