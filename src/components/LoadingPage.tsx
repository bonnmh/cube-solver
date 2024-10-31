import React from 'react';
import isEqual from 'react-fast-compare';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {styles} from '../Styles';

export const LoadingPage = React.memo(({processing}: {processing?: boolean}) => {
  if (!processing) return <></>;
  return (
    processing && (
      <View style={[StyleSheet.absoluteFill, styles.containerLoadingPage]}>
        <ActivityIndicator size={'large'} color="black" />
      </View>
    )
  );
}, isEqual);
