import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  placeholder?: string;
  value?: string;
  mode?: any;
  onChangeValue?: (value: any) => void;
};

const DatePickerField = ({  
  resource,
  fieldKey,
  parentKey,
  rules,
  placeholder, 
  value, 
  mode, 
  onChangeValue
}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const display = ScreenManager.isIos() ? 'spinner' : 'default';

  mode = mode || 'datetime';

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (value: any) => {
    if (value) setDate(value);
    if (onChangeValue) onChangeValue(value);
    hideDatePicker();
  };

  const renderRightIcon = () => {
    if (mode == 'time') {
      return <IconView name="clock" theme="transparent" />
    }
    else {
      return <IconView name="calendar" theme="transparent" />
    }
  };

  return (
      <BoxView direction="row" align="space-between">
        <TouchableOpacity onPress={showDatePicker} style={styles.fieldContainer}>
          <InputTextField 
            readOnly={true}
            placeholder={placeholder} 
            rightIcon={renderRightIcon()}
            value={value}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePickerModal
            date={date} 
            isVisible={show}
            mode={mode}
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
