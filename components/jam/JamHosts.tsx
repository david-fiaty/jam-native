import { StyleSheet, View, Text} from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

type Props = {
  item: object,
  index: number,
};

const JamHosts = ({item, index}: Props) => {
  return (
    <View style={styles.container}>        
      <ModalView 
        label={        
          <Text style={GlobalStyles.text}>
            @host +{item.host_count}
          </Text>
        }
        title="Jam Hosts" 
        content={
          <Text>JAM HOSTS</Text>
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default JamHosts;