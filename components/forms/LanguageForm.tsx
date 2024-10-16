import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import InputTextField from '../fields/InputTextField';
import LocationPickerField from '../fields/LocationPickerField';
import TextBlock from '../base/TextBlock';
import SelectListField from '../fields/SelectListField';

const LanguageForm = () => {
  return (
    <View style={styles.container}>    
      <SelectListField 
        placeholder="Language"
        data={[
          { label: "English (EN)", value: 'en' },
          { label: "French (FR)", value: 'fr' },
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: GlobalStyles.space,
  },
  buttonContainer: {
    width: '100%',
  },
  signup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalStyles.space,
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  field: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderColor: Colors.primary, 
  },
});

export default LanguageForm;