import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IFace} from '../Types';
import isEqual from 'react-fast-compare';

export const Face = React.memo(
  ({identifier, currentFace, cube, onPress}: IFace) => {
    const _renderItemI = (row: any, i: number) => (
      <View key={i} style={{flexDirection: 'row', flex: 1}}>
        {row?.map(_renderItemJ)}
      </View>
    );

    const _renderItemJ = (cell: any, j: number) => (
      <View key={j} style={{flex: 1, backgroundColor: cell?.hex, margin: 1}} />
    );

    return (
      <TouchableOpacity
        onPress={() => onPress(identifier)}
        style={{
          flex: 1,
          backgroundColor: identifier === currentFace ? '#7FD5F1' : 'transparent',
        }}>
        {cube[identifier]?.map(_renderItemI)}
      </TouchableOpacity>
    );
  },
  isEqual,
);
