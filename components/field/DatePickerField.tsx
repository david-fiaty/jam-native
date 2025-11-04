import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputTextField from '../field/InputTextField';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import ScreenManager from '@/manager/ScreenManager';
import FormManager from '@/manager/FormManager';
import DataManager from '@/manager/DataManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  label?: any;
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
  label,
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

    let fieldValue: any = value;

    if (mode == 'time') {
      fieldValue = DataManager.toDbTime(fieldValue);
    }

    if (onChangeValue) {
      onChangeValue(fieldValue);
    }
    else if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, fieldValue, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, fieldValue, rules);
    }

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
    <>
      {FormManager.renderLabel(label, rules)}
      
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

        {FormManager.renderError(fieldKey, parentKey)}
      </BoxView>
    </>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
  },
});

export default DatePickerField;
