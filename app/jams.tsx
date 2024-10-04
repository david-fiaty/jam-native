import { StyleSheet, View, FlatList, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TopNavigation from '@/components/navigation/TopNavigation';
import JamItem from '@/components/jam/JamItem';

const Jams = () => {
  return (  
    <View style={styles.container}>
      <TopNavigation />
      <FlatList 
        data={data} 
        horizontal={false}  
        renderItem={({item, index}) => <JamItem item={item} index={index} />} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column', 
    marginTop: 30,
    padding: 25,
    height: '100%',
  },
  text: {
    color: GlobalStyles.color.primary,
  },
});


const data = [
  {
    id: 1,
    title: 'Create better, together',
    content: 'Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.',
    link: 'aaa link',
  },
  {
    id: 2,
    title: 'Everything you need',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'bbb link',
  },
  {
    id: 3,
    title: 'The place to excel',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    link: 'ccc link',
  },
];

export default Jams;
