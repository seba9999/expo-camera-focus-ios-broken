import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, View } from 'react-native';

const camSize = {
  height: 300,
  width: 300,
};

export default function App() {
  const [autoFocus, setAutoFocus] = useState('on');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const onScan = (qrEvent) => {
    const data = qrEvent.data;
    console.log('data scanned =', data);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Button onPress={() => setAutoFocus('on' ? 'off' : 'on')} title='Toggle autoFocus' />

      {/* The resumePreview doesn't seems to do anything on focus */}
      <Pressable style={camSize} onPress={() => cameraRef?.current?.resumePreview()}>
        <CameraView
          ref={cameraRef}
          style={camSize}
          facing='back'
          ratio='1:1'
          autofocus={autoFocus}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={onScan}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
