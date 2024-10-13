import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import StaticIcon from '../base/StaticIcon';
import TextBlock from '@/components/base/TextBlock';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Share Jam" 
        label={
          <StaticIcon 
            name="share" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={styles.icon.size} 
          />          
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <StaticIcon 
                name="copy" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Copy link</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="email" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Send email</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="instagram" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Instagram</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="facebook" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Facebook</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="twitter" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Twitter</TextBlock>
            </View>
          </View>
        }
        animation="slide"
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
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.secondary,
      padding: GlobalStyles.space/1.5,
      borderRadius: 40,
      size: GlobalStyles.tabs.icon.size/1.5,
    },
  },
});

export default ShareJam;