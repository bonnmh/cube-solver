import KeepAwake from '@sayem314/react-native-keep-awake';
import axios from 'axios';
import colorDiff from 'color-diff';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {RNCamera, TakePictureResponse} from 'react-native-camera';
import RNGPC from 'react-native-get-pixel-color';
import Modal from 'react-native-modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import {Buttons, ContentPopup, LoadingPage} from './components';
import {styles} from './Styles';
import {Identifier} from './Types';
import {CUBE, extract, FACES, loang} from './Utils';

const cameraPermission = Camera.getCameraPermissionStatus();

const App = () => {
  const camref = useRef<RNCamera>(null);

  const [processing, setProcessing] = useState(false);
  const dimension = useWindowDimensions();
  const minSide = dimension.width;
  const [cube, setCube] = useState(CUBE);
  const [currentFace, setCurrentFace] = useState<Identifier>('f');
  const [faceColor, setFaceColor] = useState(FACES);
  const [solve, setSolve] = useState('');
  const [showModal, setShowModal] = useState(false);

  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  const hexToDec = (hex: any) => {
    if (hex?.length === 7) {
      return parseInt(hex.substr(1), 16);
    }
    return 0;
  };

  const b = (rgb: number) => rgb & 0xff;
  const g = (rgb: number) => (rgb >> 8) & 0xff;
  const r = (rgb: number) => (rgb >> 16) & 0xff;

  const onPictureTaked = async (_result: TakePictureResponse) => {
    try {
      const {uri, width, height} = _result;
      await RNGPC.setImage(uri);
      const yOffset = Math.abs(width - height) / 2;

      const result: any[] = [];
      for (let j = 0; j < width; j++) {
        const row = [];
        for (let i = 0; i < width; i++) {
          const hex = await RNGPC.pickColorAt(i, yOffset + j);
          const dec = hexToDec(hex);
          row.push({
            hex,
            dec,
            r: r(dec),
            g: g(dec),
            b: b(dec),
            group: false,
          });
        }
        result.push(row);
      }

      let group = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (result[y][x].group === false) {
            group++;
            loang(result, group, y, x);
          }
        }
      }

      const palette = extract(result);
      if (palette?.[1]?.[1]) {
        setCube(prevCube => ({
          ...prevCube,
          [currentFace]: palette,
        }));
        setFaceColor(prevFC => ({
          ...prevFC,
          [currentFace]: palette[1][1],
        }));
      }
      setProcessing(false);

      switch (currentFace) {
        case 'f':
          setCurrentFace('u');
          break;
        case 'u':
          setCurrentFace('d');
          break;
        case 'd':
          setCurrentFace('l');
          break;
        case 'l':
          setCurrentFace('r');
          break;
        case 'r':
          setCurrentFace('b');
          break;
        default:
          break;
      }
      console.log(currentFace);
    } catch (error) {
      console.log('error:', error.message);
    }
  };

  const diffPalette = Object.keys(faceColor).map(key => {
    const item = faceColor[key];
    return item?.hex ? {R: item.r, G: item.g, B: item.b, face: key} : {};
  });

  const getFaceIdentifier = color => {
    const closest = colorDiff.closest(color, diffPalette);
    return closest.face.toUpperCase();
  };

  const _onGo = () => {
    setProcessing(true);
    _onCapture();
  };

  const _onSolve = () => {
    try {
      setProcessing(true);
      let scramble = '';
      ['u', 'r', 'f', 'd', 'l', 'b'].forEach(item => {
        cube[item].forEach(row => {
          row.forEach(cell => {
            scramble += getFaceIdentifier(cell);
          });
        });
      });
      axios
        .get(`http://192.168.1.28:5011/rubik/solve?config=${scramble}`)
        .then(result => {
          setProcessing(false);
          setSolve(result.data.manouver.replace(/([A-Z])2/g, '$1 $1'));
          setShowModal(true);
        })
        .catch(e => {});
    } catch (error) {}
  };

  const _onReset = () => {
    setCube(CUBE);
    setCurrentFace('f');
    setFaceColor(FACES);
    setSolve('');
  };

  const _onHideModal = () => setShowModal(false);

  const _onCapture = async () => {
    try {
      camref.current
        ?.takePictureAsync({width: 32, quality: 1})
        .then(onPictureTaked);
    } catch (e) {}
  };

  const renderFace = (identifier: Identifier) => {
    const _renderItemI = (row: any, i: number) => (
      <View key={i} style={{flexDirection: 'row', flex: 1}}>
        {row?.map(_renderItemJ)}
      </View>
    );

    const _renderItemJ = (cell: any, j: number) => (
      <View key={j} style={{flex: 1, backgroundColor: cell?.hex, margin: 1}} />
    );

    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            identifier === currentFace ? '#7FD5F1' : 'transparent',
        }}>
        {cube[identifier]?.map(_renderItemI)}
      </View>
    );
  };

  const renderFaces = (style: ViewStyle = styles.face) => (
    <View style={styles.containerFaces}>
      <View style={styles.row}>
        <View style={style} />
        <TouchableOpacity
          onPress={() => {
            setCurrentFace('u');
          }}
          style={[style, styles.mainFace, styles.border]}>
          {renderFace('u')}
        </TouchableOpacity>
        <View style={style} />
        <View style={style} />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setCurrentFace('l')}
          style={[style, styles.mainFace, styles.border]}>
          {renderFace('l')}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentFace('f')}
          style={[style, styles.mainFace]}>
          {renderFace('f')}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentFace('r')}
          style={[style, styles.mainFace, styles.border]}>
          {renderFace('r')}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentFace('b')}
          style={[style, styles.mainFace, styles.border, {borderLeftWidth: 0}]}>
          {renderFace('b')}
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={style} />
        <TouchableOpacity
          onPress={() => setCurrentFace('d')}
          style={[style, styles.mainFace, styles.border]}>
          {renderFace('d')}
        </TouchableOpacity>
        <View style={style} />
        <View style={style} />
      </View>
    </View>
  );

  useEffect(() => {
    (async () => {
      if (cameraPermission === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'granted') {
        }
      }
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.containerPermission}>
        <Text>No Camera Permission</Text>
      </View>
    );
  }

  if (device == null) return <View />;

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <KeepAwake />
        <RNCamera
          ref={camref}
          style={{width: minSide, height: minSide}}
          ratio={'1x1'}
        />
        <View style={styles.container1}>
          {renderFaces()}
          <Buttons onGo={_onGo} onSolve={_onSolve} onReset={_onReset} />
        </View>
        <LoadingPage processing={processing} />
        <Modal
          isVisible={showModal}
          onBackButtonPress={_onHideModal}
          onBackdropPress={_onHideModal}>
          <ContentPopup solve={solve}>
            {renderFaces(styles.miniFace)}
          </ContentPopup>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
