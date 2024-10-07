import { StyleSheet, FlatList } from 'react-native';
import JamItem from '../jam/JamItem';

const JamsList = () => {
  return (
    <FlatList 
      data={data} 
      horizontal={false}  
      renderItem={({item, index}) => <JamItem item={item} index={index} />} 
    />
  );
};

const styles = StyleSheet.create({

});

const data = [
  {
    id: 1,
    host_count: 3,
    content: 'Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.',
  },
  {
    id: 2,
    host_count: 7,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    host_count: 5,
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
  },
];

export default JamsList;