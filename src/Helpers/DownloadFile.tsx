import React from 'react';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const createdDir = `${
  Platform.OS === 'ios'
    ? ReactNativeBlobUtil.fs.dirs.DocumentDir
    : `/storage/emulated/0/Android/data/ai.builder.careerhunt/files/Picture `
}`;

class DownloadingController {
  constructor() {}

  _checkPermission = async (result: any) => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Files',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.downloadBrochure(result);
        } else {
          this._checkPermission(result);
        }
      } catch (err) {
        // console.log(err);
      }
    } else {
      this.downloadBrochure(result);
    }
  };

  // Download Image
  downloadBrochure = async (link: any) => {
    const check = await ReactNativeBlobUtil.fs.exists(createdDir);
    if (!check) {
      await ReactNativeBlobUtil.fs.mkdir(createdDir);
    }

    Alert.alert('Confirm', 'Do you want to download the Image?', [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log(link, 'got');
          let imageURL = link;
          let date = new Date();
          let ext = this.getExtension(imageURL);
          ext = '.' + ext[0];
          const {config, fs} = ReactNativeBlobUtil;
          let PictureDir = createdDir;
          console.log(PictureDir, 'Path');
          let options = {
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path:
                PictureDir +
                '/image_' +
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                ext,
              description: 'Image',
            },
          };
          config(options)
            .fetch('GET', imageURL)
            .then(res => {
              alert('Downloaded Successfully');
            });
        },
      },
    ]);
  };

  getExtension(filename: any) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }
}
export default DownloadingController;
