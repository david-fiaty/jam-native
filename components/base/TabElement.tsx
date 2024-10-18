import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  label: JSX.Element,
  content: JSX.Element,
  active: boolean,
}

const TabElement = ({label, content, active}: Props) => {
  const [isTabActive, setTabActive] = useState(false);

  console.log(active);

  return (
    <>
      <TouchableOpacity onPress={() => setTabActive(!isTabActive)}>
        <View style={styles.label}>
          {label}
        </View>
      </TouchableOpacity>
  
      {isTabActive && (
        <TouchableWithoutFeedback onPress={() => setTabActive(false)}>
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