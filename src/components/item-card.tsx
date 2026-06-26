import { CURRENCY } from 'helpers/constants';
import {
  ItemCardBase,
  ItemCardImage,
  ItemCardContent,
  ItemCardPrice,
} from './utils/theme';

interface ItemProps {
  cover: string;
  title: string;
  author: string;
  price: number;
  format: string;
}

interface ItemCardProps {
  item: ItemProps;
  onClick?: (e: any) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div className={ItemCardBase} onClick={onClick}>
      <div className={ItemCardImage}>
        <img
          className="object-cover"
          src={item.cover}
          alt={`Cover of ${item.title}`}
        />
      </div>

      <div className={ItemCardContent}>
        <span className={ItemCardPrice}>
          {item.price === '0' || item.price === 0 ? 'Free' : `${CURRENCY}${item.price}`}
        </span>
        <span className="text-13px font-semibold">{item.title}</span>
        <span className="text-11px text-gray-500">{item.author}</span>
        <span className="text-10px text-gray-400 uppercase">{item.format}</span>
      </div>
    </div>
  );
};

export default ItemCard;
