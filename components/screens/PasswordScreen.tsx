import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import PasswordForm from '../forms/PasswordForm';
import ScrollContainer from '../base/ScrollContainer';

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
          <ScrollContainer>
            <PasswordForm />
          </ScrollContainer>
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PasswordScreen;