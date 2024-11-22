import React, { useState } from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

type Props = BaseProps & {
  placeholder?: string,
  value?: string,
  onChangeValue?: (value: any) => void,
};

const DatePickerField = ({placeholder, value, onChangeValue}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, value: any) => {
    setShow(false); 
    if (value) setDate(value);
    if (onChangeValue) onChangeValue(value);
  };

  const display = Platform.OS === 'ios' ? 'spinner' : 'default';

  return (
      <BoxView direction="row" align="space-between">
        <TouchableOpacity onPress={() => setShow(true)} style={styles.fieldContainer}>
          <InputTextField 
            readOnly={true}
            placeholder={placeholder} 
            rightIcon={<IconView name="calendar" theme="transparent" />}
            value={date.toLocaleDateString()}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date} 
            mode="date"
            display={display} 
            onChange={onChange}
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
