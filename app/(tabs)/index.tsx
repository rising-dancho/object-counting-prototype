import { View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { type ImageSource } from 'expo-image';

// components
import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  // hooks
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const imageRef = useRef<View>(null);

  // methods
  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [status, requestPermission]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert('You did not select any image');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
        format: 'png', // Ensure PNG format to support transparency
      });

      if (Platform.OS === 'web') {
        const response = await fetch(localUri);
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'image.png'; // File extension supports transparency
        a.click();
      } else {
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef} style={{}}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onSelect={(item) => setPickedEmoji(item)}
          onCloseModal={onModalClose}
        ></EmojiList>
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
