import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import { BaseProps } from '@/constants/Types';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = BaseProps & {
  label?: string,
  value?: string,
  onChange: () => void,
};

const DatePickerField = ({label, value}: Props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>
        {date.toLocaleDateString()}
      </Text>
      <Button
        title="Pick a Date"
        onPress={() => setShow(true)}
      />
      {show && (
        <DateTimePicker
          value={date} 
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 16,
  },
});

export default DatePickerField;
