import JamsList from '../list/JamsList';

type Props = {
  idArray?: any;
};

const JamsSection = ({ idArray }: Props) => {
  return (<JamsList idArray={idArray} />);
};

export default JamsSection;