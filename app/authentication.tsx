import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { SvgImage } from '@/components/SvgImage';

const Authentication = () => {
  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.logo}>
        <SvgImage uri={require('@/assets/images/jam-logo.png')} />    
      </View>
      <Text style={[GlobalStyles.text, styles.title]}>Welcome back</Text>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        style={GlobalStyles.input}
        placeholder="Enter your email address"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <View style={GlobalStyles.buttonContainer}>
        <Button 
          title="Continue" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Authentication;
