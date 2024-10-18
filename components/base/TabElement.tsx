import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  label: JSX.Element,
  content: JSX.Element,
  active: boolean,
}

const TabElement = ({label, content, active}: Props) => {
  console.log(Date.now(), active);

  return (
    <>
      <View style={styles.label}>
        {label}
      </View>
    
      {active && (
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              {content}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: GlobalStyles.space.container*2,
  }, 
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GlobalStyles.footer.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    width: '100%',
    padding: GlobalStyles.space.container,
    paddingBottom: 0,
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
  },
});

export default TabElement;