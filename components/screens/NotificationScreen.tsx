import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const NotificationScreen = ({menuItem}: Props) => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title={<TextBlock>{menuItem.label}</TextBlock>} 
        animation="fade"
        label={<MenuItem label={menuItem.label} />}
        content={
          <ScrollContainer>
            <TextBlock>{menuItem.content}</TextBlock>
          </ScrollContainer>
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NotificationScreen;