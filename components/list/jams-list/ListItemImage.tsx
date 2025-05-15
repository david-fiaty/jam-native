import { memo } from "react";
import ImageSlideshow from "@/components/slideshow/ImageSlideshow";

type Props = {
  row?: any;
};

const ListItemImage = ({ row }: Props) => {
  return <ImageSlideshow data={row?.item.medias} />;
};

export default memo(ListItemImage);
