import RNFetchBlob from 'rn-fetch-blob';

export const downloadFile = (uri) => {
  const { config, fs } = RNFetchBlob;
  const PictureDir = fs.dirs.PictureDir;
  const date = new Date();
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: false,
      path: PictureDir + Math.floor(date.getTime() + date.getSeconds() / 2),
      description: 'Downloading file...',
    },
  };

  config(options)
    .fetch('GET', uri)
    .then((res) => {
      console.log(res);
    });
};
