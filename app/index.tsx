import { StyleSheet, View } from 'react-native';
import ClearIcon from '@/components/icons/ClearIcon';
import TabElement from '@/components/base/TabElement';
import AddJamScreen from '@/components/screens/AddJamScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ViewportContainer from '@/components/base/ViewportContainer';

const Index = () => {
  return (  
    <ViewportContainer>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TabElement 
            label={<ClearIcon name="location" size={GlobalStyles.footer.icon.size} />}
            content={<AddJamScreen />}
          />
          <TabElement 
            label={<ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />}
            content={<AddJamScreen />}
          />
          <TabElement 
            label={<ClearIcon name="user" size={GlobalStyles.footer.icon.size} />}
            content={<AddJamScreen />}
          />
        </View>
      </View>
    </ViewportContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    paddingVertical: GlobalStyles.space.base,
  },
});

export default Index;