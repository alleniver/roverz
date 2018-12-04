import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppColors } from '../../theme';
import t from '../../i18n';


const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: AppColors.brand().sD_text,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default class Send extends React.Component {
  // Custom Send from react-native-gifted-chat
  render() {
    if (this.props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, this.props.containerStyle]}
          onPress={() => {
            this.props.onSend({ text: this.props.text.trim() }, true);
          }}
          accessibilityTraits="button"
        >
          <Icon
            name="send"
            size={24}
            style={[styles.icon]}
            color={AppColors.brand().third}
          />
        </TouchableOpacity>
      );
    }
    return <View />;
  }
}

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: t('lbl_send'),
  containerStyle: {},
  textStyle: {},
};

