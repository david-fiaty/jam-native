import { StaticImage } from '../base/StaticImage';

type Props = {
  width: number,
  height: number,
};

const source = '@/assets/images/jam-logo.png'; 

export function JamLogo({width, height}: Props) {
  return (
    <StaticImage 
      source={source} 
      width={width}
      height={height}
    />   
  );
};


