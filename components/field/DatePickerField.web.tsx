import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import Datetime from 'react-datetime';
import ScreenManager from '@/manager/ScreenManager';
import "react-datetime/css/react-datetime.css";

type Props = {
  placeholder?: string;
  value?: string;
  mode?: any;
  onChangeValue?: (value: any) => void;
};

const DatePickerField = ({placeholder, value, mode, onChangeValue}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const display = ScreenManager.isIos() ? 'spinner' : 'default';

  mode = mode || 'datetime';

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
            dateFormat={Config.uiDateFormat} 
            value={date}
            onChange={handleConfirm}
          />

          <TouchableOpacity onPress={hideDatePicker} style={styles.closeButton}>
            <IconView name="close" theme="secondary" size={16} />
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
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: Layout.space.base,
    right: Layout.space.base,
  },
});

export default DatePickerField;
