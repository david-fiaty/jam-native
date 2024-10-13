import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import TextBlock from '@/components/base/TextBlock';
import ClearIcon from '../icons/ClearIcon';
import SecondaryIcon from '../icons/SecondaryIcon';

const MoreActions = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="More" 
        animation="slide"
        label={
          <ClearIcon name="actions" />
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <SecondaryIcon name="save" />
              <TextBlock>Save Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="share" />
              <TextBlock>Share Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="plus" />          
              <TextBlock>Add to project</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="view" />
              <TextBlock>View project</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="edit" />
              <TextBlock>Edit jam</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="report" />
              <TextBlock>Report Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="delete" />
              <TextBlock>Delete Jam</TextBlock>
            </View>
          </View>
        }
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space,
  },
});

export default MoreActions;