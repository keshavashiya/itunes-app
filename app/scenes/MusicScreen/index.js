import React from 'react';
import {
  Platform,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { images, fonts } from '@themes';
import AppContainer from '@atoms/Container';
import T from '@atoms/T';

import {
  selectMusic,
  selectMusicIsLoading,
  selectMusicErrorMessage
} from './selectors';
import { musicScreenActions } from './reducer';

class MusicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      loading: false
    };
  }

  search = () => {
    this.props.fetchMusic(this.state.value);
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: 32, backgroundColor: '#fff' }}>
        <SafeAreaView />
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
              iTunes Music
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TextInput
              placeholder="Search..."
              style={{
                height: 40,
                borderColor: '#999998',
                borderWidth: 1,
                padding: 12,
                borderRadius: 5,
                flex: 1
              }}
              onChangeText={text => this.setState({ value: text })}
              value={this.state.value}
            ></TextInput>
            <View style={{ marginLeft: 12, marginRight: 2 }}>
              <Button
                onPress={this.search}
                color="#999998"
                type="outline"
                title="Search"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 52 }}>
          {this.props.music &&
            this.props.music.map((item, index) => {
              if (item.trackName) {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 16,
                      height: 80,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    key={index}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <Image
                        style={{ height: 80, width: 80, borderRadius: 10 }}
                        source={{ uri: item.artworkUrl100 }}
                      ></Image>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginLeft: 16
                      }}
                    >
                      <Text numberOfLines={1}>{item.trackName}</Text>
                      <Text
                        style={{ marginTop: 4, color: '#999998' }}
                        numberOfLines={1}
                      >
                        {item.artistName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                      <Text style={{ color: '#999998' }} numberOfLines={1}>
                        {item.trackPrice} $
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
        </View>
      </ScrollView>
    );
  }
}

MusicScreen.propTypes = {
  music: PropTypes.array,
  musicIsLoading: PropTypes.bool,
  musicErrorMessage: PropTypes.string,
  fetchMusic: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  music: selectMusic(),
  musicIsLoading: selectMusicIsLoading(),
  musicErrorMessage: selectMusicErrorMessage()
});

const mapDispatchToProps = dispatch => ({
  fetchMusic: e => dispatch(musicScreenActions.requestFetchMusic(e))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, injectIntl)(MusicScreen);
export { MusicScreen as MusicScreenTest };
