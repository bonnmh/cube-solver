import React from 'react';
import isEqual from 'react-fast-compare';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../Styles';
import {IButtons} from '../Types';

export const Buttons = React.memo(({onGo, onSolve, onReset}: IButtons) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.containerBtns, {bottom: insets.bottom}]}>
      <Pressable onPress={onReset} style={[styles.button, {backgroundColor: '#D9D9D9'}]}>
        <Text>RESET</Text>
      </Pressable>
      <Pressable onPress={onSolve} style={[styles.button, {backgroundColor: '#F2C0C0'}]}>
        <Text>SOLVE</Text>
      </Pressable>
      <TouchableOpacity onPress={onGo} style={[styles.button, {backgroundColor: '#7FD5F1'}]}>
        <Text>GO</Text>
      </TouchableOpacity>
    </View>
  );
}, isEqual);