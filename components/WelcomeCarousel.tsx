import { Text, Image, View, Button, StyleSheet, FlatList } from 'react-native';

export default function WelcomeCarousel() {
  return (  
    <View style={styles.container}>
      <FlatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    width: "100%",
    height: 200,
  },
});
