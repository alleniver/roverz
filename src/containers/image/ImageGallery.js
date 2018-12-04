import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-transformable-image';
import PropTypes from 'prop-types';
import t from '../../i18n/';
import { AppColors } from '../../theme';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.brand().iG_containerBg },
  captionContainer: {
    bottom: 0,
    height: 65,
    backgroundColor: AppColors.brand().iG_captionContainerBg,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  captionText: {
    textAlign: 'center',
    color: AppColors.brand().iG_captionTextColor,
    fontSize: 15,
    fontStyle: 'italic',
  },
  header: {
    top: 0,
    height: 65,
    backgroundColor: AppColors.brand().iG_headerBg,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  galleryCount: {
    top: 0,
    height: 65,
    backgroundColor: AppColors.brand().iG_galleryCountBg,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  galleryText: {
    textAlign: 'right',
    color: AppColors.brand().iG_galleryTextColor,
    fontSize: 15,
    fontStyle: 'italic',
    paddingRight: '10%',
  },
  error: {
    flex: 1,
    backgroundColor: AppColors.brand().iG_errorBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: AppColors.brand().iG_errorTextColor,
    fontSize: 15,
    fontStyle: 'italic',
  },
});

export default class ImageGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      images: [
        { caption: this.props.imgTitle, source: { uri: this.props.imgUrl } },
      ],
    };
    this.onChangeImage = this.onChangeImage.bind(this);

    // this.addImages();
    // this.removeImages();
    // this.removeImage(2, 3000);
  }

  onChangeImage(index) {
    this.setState({ index });
  }

  get caption() {
    const { images, index } = this.state;
    return (
      <View style={[styles.captionContainer]}>
        <Text style={[styles.captionText]}>
          {(images[index] && images[index].caption) || ''}
        </Text>
      </View>
    );
  }

  get header() {
    return (
      <View style={[styles.header]} />
    );
  }

  get galleryCount() {
    const { index, images } = this.state;
    return (
      <View style={[styles.galleryCount]} >
        <Text style={[styles.galleryText]}>
          {index + 1} / {images.length}</Text>
      </View>
    );
  }

  _onLayout = (event) => {
    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      },
    });
  }

  renderError() {
    return (
      <View style={[styles.error]}>
        <Text style={[styles.errorText]}>{t('err_img_loading_err_1')}</Text>
        <Text style={[styles.errorText]}>{t('err_img_loading_err_2')}</Text>
      </View>
    );
  }

  // @todo: don't ask why we set pixels to this value, actually we have to
  // move to a decent image gallery software that takes care of caching
  // and image pan/zoom-to
  render() {
    const screen = Dimensions.get('window');
    return (
      <View style={[styles.container]} onLayout={this._onLayout}>
        <Image
          style={{ width: screen.width, height: screen.height }}
          source={{ uri: this.props.imgUrl }}
          pixels={{ width: 3607, height: 2400 }}
        />
        {this.caption}
        {this.header}
      </View>
    );
  }
}

ImageGallery.defaultProps = {
  imgUrl: '',
  imgTitle: '',
};

