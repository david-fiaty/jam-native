import { StaticImage } from '../base/StaticImage';

type Props = {
  width?: string | object,
  height?: string | object,
};

const source = require('@/assets/images/jam-logo.png'); 

const JamLogo = ({width, height}: Props) => {
  return (
    <StaticImage 
      source={source} 
      width={width}
      height={height}
    />   
  );
};

export default JamLogo;

