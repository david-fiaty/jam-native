import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import InputTextField from '../fields/InputTextField';
import SelectListField from '../fields/SelectListField';
import LocationPickerField from '../fields/LocationPickerField';
import TextBlock from '../base/TextBlock';
import IndustriesData from '@/constants/IndustriesData';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Public name"
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="IG handle"
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Email"
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Phone number"
      />
      <LocationPickerField 
        title={<TextBlock>Select your location</TextBlock>}
        label="Current location"
      />
      <SelectListField 
        placeholder="Industries"
        data={IndustriesData} 
      />
      <SelectListField 
        placeholder="Sub industries"
        data={IndustriesData} 
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Creative organisation"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: GlobalStyles.space.base,
  },
  wrapper: {
    width: '100%',
    paddingBottom: 40,
  },
  scroller: {
    flexGrow: 1,
  },  
  input: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 8,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
});

export default ProfileForm;