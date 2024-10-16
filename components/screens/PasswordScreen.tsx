import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import PasswordForm from '../forms/PasswordForm';

type Props = {
  menuItem: object,
};

const PasswordScreen = ({menuItem}: Props) => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title={<TextBlock>{menuItem.label}</TextBlock>} 
        animation="fade"
        label={<MenuItem label={menuItem.label} />}
        content={
          <ScrollView 
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Pressable>
              <PasswordForm />
            </Pressable>
          </ScrollView>  
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  scroll: {
    flexGrow: 1,
  },  
});

export default PasswordScreen;