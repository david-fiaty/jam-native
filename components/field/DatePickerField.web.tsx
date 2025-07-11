import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Config } from '@/constants/Config';
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import Datetime from 'react-datetime';
import ScreenManager from '@/manager/ScreenManager';
import "react-datetime/css/react-datetime.css";
import TextView from '../view/TextView';

type Props = {
  placeholder?: string,
  value?: string,
  onChangeValue?: (value: any) => void,
};

const DatePickerField = ({placeholder, value, onChangeValue}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const display = ScreenManager.isIos() ? 'spinner' : 'default';

  const showDatePicker = () => {
    setShow(!show);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (value: any) => {
    if (value) setDate(value);
    if (onChangeValue) onChangeValue(value);
  };

  return (
    <>
      <BoxView direction="row" align="space-between">
        <TouchableOpacity onPress={showDatePicker} style={styles.fieldContainer}>
          <InputTextField 
            readOnly={true}
            placeholder={placeholder} 
            rightIcon={<IconView name="calendar" theme="transparent" />}
            value={value}
          />
        </TouchableOpacity>
      </BoxView>

      {show && (
        <View style={styles.calendarContainer}>
          <Datetime 
            input={false}
            dateFormat={Config.dateFormat} 
            value={date}
            onChange={handleConfirm}
          />

          <TouchableOpacity onPress={hideDatePicker}>
            <TextView>Close</TextView>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
  },
  calendarContainer: {
    
  },
});

export default DatePickerField;
