import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from '@/translation/i18n';
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';

type Props = BaseProps & {
  placeholder?: string,
  value?: string,
  callback?: () => void,
};

const DatePickerField = ({placeholder, value, callback}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setShow(false); 
    if (selectedDate) setDate(selectedDate);
    if (callback) callback();
  };

  const display: string = Platform.OS === 'ios' ? 'spinner' : 'default';

  return (
    <View style={styles.container}>
      <BoxView direction="row" align="space-between">
        <TouchableOpacity onPress={() => setShow(true)}>
          <InputTextField 
            readOnly={true}
            placeholder={placeholder} 
            rightIcon={<IconView name="calendar" theme="transparent" />}
            value={date.toLocaleDateString()}
          />
        </TouchableOpacity>
      </BoxView>

      {show && (
        <DateTimePicker
          value={date} 
          mode="date"
          display={display} 
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default DatePickerField;
