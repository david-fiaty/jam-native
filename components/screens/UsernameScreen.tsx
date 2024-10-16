import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const UsernameScreen = ({menuItem}: Props) => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title={<TextBlock>{menuItem.label}</TextBlock>} 
        animation="fade"
        label={<MenuItem label={menuItem.label} />}
        content={
          <ScrollContainer>
            <ProfileImage />
            <ProfileForm />
            <ProfileProjects />
            <ProfileJams />
          </ScrollContainer>
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UsernameScreen;