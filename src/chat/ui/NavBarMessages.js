import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavButton } from 'react-native-nav';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { AppStyles, AppColors } from '../../theme/';

const icon = AppColors.brand().nM_Icon;

export default class NavBarMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
    };
  }

  componentWillMount() {
    /* this.setState({
      title: Application.base.instance,
    }); */
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={[AppStyles.navbar, AppStyles.navbarHeight, {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        flex: 1,
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.brand().secondary,
      }]}
      >
        <NavButton
          style={{ width: 35, paddingRight: 15, justifyContent: 'center', alignItems: 'flex-start' }}
          onPress={Actions.chats}
        >
          <Icon
            name="keyboard-arrow-left"
            size={32}
            color={icon}
          />
        </NavButton>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 30 }}>
          <Text style={[AppStyles.navbarTitle]}>{this.state.title}</Text>
        </View>
      </View>
    );
  }
}

NavBarMessages.defaultProps = {
  title: '',
};
