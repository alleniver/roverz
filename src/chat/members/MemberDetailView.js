import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import UserAvatar from 'react-native-user-avatar';

import t from '../../i18n/';
import AppUtil from '../../lib/util';
import Network from '../../network';
import Group from '../../models/group';
import { AppStyles, AppSizes, AppColors } from '../../theme/';
import Constants from '../../models/constants';

const styles = StyleSheet.create({
  container: { position: 'relative' },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: AppColors.brand().mD_imageBg,
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    borderRadius: 0,
  },
  detailsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  dataContainer: {
    borderTopColor: AppColors.brand().mD_dataContainerBorderTopColor,
    // borderTopColor: 'red',
    borderTopWidth: 1,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingTop: 20,
  },
  statusCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  statusText: {
    color: AppColors.brand().mD_statusTextColor,
  },
});

export default class MemberDetailView extends Component {

  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    const memberId = this.props.memberId;
    this._service = new Network();
    this._mounted = false;
    this.userDetailList = this._service.chat.service.db.users.findByIdAsList(this.props.memberId);
    this.state = {
      memberId,
      memberDetail: {
        _id: '',
        email: '',
        username: '',
        name: '',
        utcOffset: '',
        avatar: '',
        type: '',
        status: '',
        statColor: AppColors.brand().mD_statColor,
      },
      layout: {
        height,
        width,
      },
    };
  }

  componentDidMount() {
    if (this.userDetailList) {
      this.userDetailList.addListener(this._changeListener);
    }
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.userDetailList) {
      this.userDetailList.removeListener(this._changeListener);
    }
    this._changeListener = null;
  }

  _changeListener = (list/* , changes */) => {
    if (!this._mounted) return;
    let statColor = '';
    switch (list[0].status) {
      case Constants.U_ONLINE:
        statColor = AppColors.status().online; break;
      case Constants.U_AWAY:
        statColor = AppColors.status().away; break;
      case Constants.U_BUSY:
        statColor = AppColors.status().busy; break;
      default:
        statColor = AppColors.status().default;
    }
    this.setState({
      memberDetail: {
        _id: list[0]._id,
        email: list[0].emails,
        username: list[0].username,
        name: list[0].name,
        utcOffset: list[0].utcOffset,
        avatar: list[0].avatar,
        type: list[0].type,
        status: list[0].status,
        statColor,
        avatarSuccess: true,
      },
    });
  };

  _onLayout = (event) => {
    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      },
    });
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container, {
          marginTop: AppSizes.navbarHeight,
        }]}
        onLayout={this._onLayout}
      >
        {
          this.state.memberDetail.name !== '' &&
          <View
            style={[styles.container, {
              height: this.props.avHeight ? this.props.avHeight : 300,
            }]}
          >
            <CachedImage
              source={{ uri: this.state.memberDetail.avatar }}
              style={[styles.image, {
                width: this.state.layout.width,
                height: this.props.avHeight ? this.props.avHeight : 300,
              }]}
            />
            <UserAvatar
              name={AppUtil.avatarInitials(this.state.memberDetail.name)}
              size={this.props.avHeight ? this.props.avHeight : 300}
              style={[styles.avatar, {
                width: this.state.layout.width,
              }]}
            />
          </View>
        }
        <View
          style={[styles.detailsContainer]}
        >
          <Text
            style={[AppStyles.memberDetailsLG, { marginTop: 10 }]}
          >{ this.state.memberDetail.name }</Text>
          <Text
            style={[AppStyles.memberDetailsMD]}
          >{ `@${this.state.memberDetail.username}` }</Text>
          <Text
            style={[AppStyles.memberDetailsSM]}
          >{ this.state.memberDetail.email }</Text>
          {
            this.state.memberDetail.utcOffset !== null &&
            <Text
              style={[AppStyles.memberDetailsSM]}
            >{ `${t('txt_time_zone')} ${this.state.memberDetail.utcOffset}` }</Text>
          }
          <View
            style={[styles.dataContainer]}
          >
            <View
              style={[styles.statusCircle, {
                backgroundColor: this.state.memberDetail.statColor,
              }]}
            />
            <Text
              style={[styles.statusText]}
            >{this.state.memberDetail.status}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

MemberDetailView.defaultProps = {
  group: null,
  memberId: '',
  memberUsername: '',
  avHeight: null,
};

