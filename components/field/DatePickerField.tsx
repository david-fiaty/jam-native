import React, { useState } from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

type Props = {
  placeholder?: string,
  value?: string,
  onChangeValue?: (value: any) => void,
};

const DatePickerField = ({placeholder, value, onChangeValue}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const display = Platform.OS === 'ios' ? 'spinner' : 'default';

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: any) => {
    if (date) setDate(date);
    if (onChangeValue) onChangeValue(date);
    hideDatePicker();
  };

  return (
      <BoxView direction="row" align="space-between">
        <TouchableOpacity onPress={showDatePicker} style={styles.fieldContainer}>
          <InputTextField 
            readOnly={true}
            placeholder={placeholder} 
            rightIcon={<IconView name="calendar" theme="transparent" />}
            value={value}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePickerModal
            date={date} 
            isVisible={show}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display={display} 
          />
        )}
      </BoxView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%'
  },
});

export default DatePickerField;
