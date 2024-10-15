import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import TextBlock from '../base/TextBlock';

type Props = {
  label: JSX.Element,
  title: JSX.Element,
};

const CheckboxListField = ({label, title}: Props) => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title={title} 
        animation="slide"
        label={label}
        content={
          <ScrollView 
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Pressable>
              <ProfileImage />
              <ProfileForm />
              <ProfileProjects />
              <ProfileJams />
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

export default CheckboxListField;