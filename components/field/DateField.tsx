import { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';

const DateField = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <Button title="Open" onPress={() => setOpen(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default DateField;