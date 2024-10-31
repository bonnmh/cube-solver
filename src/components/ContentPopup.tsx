import React from 'react';
import isEqual from 'react-fast-compare';
import {Image, Text, View} from 'react-native';
import {styles} from '../Styles';
import {IContentPopup} from '../Types';
import {images} from '../assets/images';

export const ContentPopup = React.memo(({solve, children}: IContentPopup) => {
  return (
    <View style={styles.containerContentPopup}>
      {children}
      <View style={styles.containerWrapperPopup}>
        {solve?.split(/\s+/)?.map((move, index) => (
          <View key={index} style={styles.popupItem}>
            <Image
              source={images[move]}
              style={styles.imgPopupItem}
              resizeMode={'contain'}
            />
            <Text style={{fontSize: 20}}>{move}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}, isEqual);
