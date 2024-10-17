import WelcomeScreen from '@/components/screens/WelcomeScreen';
import FooterBar from '@/components/navigation/FooterBar';
import JamsScreen from '@/components/screens/JamsScreen';

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
          <View style={styles.tab}>
            <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
          </View>
          <View style={styles.tab}>
            <ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />
          </View>
          <View style={styles.tab}>
            <ClearIcon name="user" size={GlobalStyles.footer.icon.size} />
          </View>
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
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

export default Index;