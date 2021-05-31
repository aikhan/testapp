import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './css/TextInputFloating.module.css';
const TextInputFloating = ({
  label,
  value,
  onChangeText: onChangeText,
  onBlur: onBlur,
  error: error,
}: TextInputFloatingProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleFocus = () => setIsEditing(true);
  useEffect(() => {
    if (value.length >= 1) {
      setIsEditing(true);
    }
  }, [value.length]);
  return (
    <View
      style={[
        error
          ? [
              styles.container as StyleProp<ViewStyle>,
              {borderWidth: 0.4, borderColor: 'red'},
            ]
          : (styles.container as StyleProp<ViewStyle>),
      ]}>
      <Text
        style={[
          isEditing
            ? (styles.labelStyleFocused as StyleProp<ViewStyle>)
            : (styles.labelStyleNotFocused as StyleProp<ViewStyle>),
        ]}>
        {label}
      </Text>
      <TextInput
        style={styles.textInput as StyleProp<ViewStyle>}
        onFocus={handleFocus}
        onBlur={onBlur}
        onChangeText={text => onChangeText(text)}
        value={value}
        autoCapitalize="words"
      />
      <TouchableOpacity
        style={[
          isEditing
            ? (styles.closeButton as StyleProp<ViewStyle>)
            : (styles.closeButtonHidden as StyleProp<ViewStyle>),
        ]}
        disabled={!isEditing}
        onPress={() => onChangeText('')}>
        <Image
          style={styles.closeButtonImage as StyleProp<ImageStyle>}
          source={require('../../../assets/close.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TextInputFloating;

// const styles = StyleSheet.create({
//   container: {
//     margin: 2,
//     marginTop: 6,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     borderRadius: 6,
//     marginRight: 16,
//     marginLeft: 16,
//     height: 60,
//     backgroundColor: '#FFFFFF08',
//   },
//   labelStyleFocused: {
//     position: 'absolute',
//     left: 16,
//     top: 7,
//     fontSize: 12,
//     color: '#FFFFFF40',
//   },
//   labelStyleNotFocused: {
//     position: 'absolute',
//     left: 16,
//     top: 22,
//     fontSize: 16,
//     color: '#aaa',
//   },
//   textInput: {
//     fontSize: 16,
//     height: 30,
//     width: '90%',
//     color: '#FFF',
//     lineHeight: 16,
//     marginTop: 20,
//     paddingLeft: 16,
//   },
//   closeButtonHidden: {
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginRight: 15,
//     marginTop: 17,
//     opacity: 0.0,
//     width: 26,
//     height: 26,
//   },
//   closeButton: {
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginRight: 20,
//     marginTop: 17,
//     opacity: 0.7,
//     width: 26,
//     height: 26,
//     backgroundColor: '#FFFFFF20',
//     borderRadius: 40,
//   },
//   closeButtonImage: {
//     height: 26,
//     width: 26,
//   },
// });
TextInputFloating.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

interface TextInputFloatingProps {
  label: string;
  value: string;
  onChangeText: Function;
  onBlur: (e: any) => void;
  error?: null | string;
}
