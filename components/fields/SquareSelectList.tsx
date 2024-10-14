import RadioGroup from 'react-native-radio-buttons-group';
import React, { useState } from 'react';
import { View } from 'react-native';

const SquareSelectList = () => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Option 1',
      value: 'option1',
      color: '#f39c12',
      selected: false,
      size: 24, // Size of the square
      borderColor: '#34495e', // Border color for square
      shape: 'square', // Custom shape
    },
    {
      id: '2',
      label: 'Option 2',
      value: 'option2',
      color: '#e74c3c',
      selected: false,
      size: 24,
      borderColor: '#34495e',
      shape: 'square',
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  
  return (
    <View>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
        layout="row" // Horizontal layout
      />
    </View>
  );
}

export default SquareSelectList;
