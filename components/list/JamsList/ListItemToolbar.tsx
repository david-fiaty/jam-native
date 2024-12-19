import { BaseProps } from "@/constants/Types";
import ImageSlideshow from "@/components/slideshow/ImageSlideshow";

type Props = BaseProps & {
  row?: any,
};

const ListItemToolbar = ({ row }: Props) => {
  return <ImageSlideshow data={row?.item.medias} />;
};

export default ListItemToolbar;
