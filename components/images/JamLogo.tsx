import { StaticImage } from '../base/StaticImage';

type Props = {
  width: number,
  height: number,
};

const JamLogo = ({width, height}: Props) => {
  const source = require('@/assets/images/jam-logo.png'); 
  
  return (
    <StaticImage 
      source={source} 
      width={width}
      height={height}
    />   
  );
};

export default JamLogo;

