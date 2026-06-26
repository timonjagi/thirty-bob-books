import Counter from './counter';
import { CURRENCY } from 'helpers/constants';
import { useCart } from 'contexts/cart/cart.provider';
import {
  CartItemBase,
  CartItemImage,
  CartItemContent,
  CartItemName,
  CartItemSinglePrice,
  CartItemTotalWrapper,
  CartItemTotalPrice,
} from './utils/theme';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addItem, removeItem } = useCart();

  return (
    <div className={CartItemBase}>
      <div className={CartItemImage}>
        <img src={item.cover} alt={item.title} />
      </div>

      <div className={CartItemContent}>
        <span className={CartItemName}>{item.title}</span>
        <span className="text-11px text-gray-500">{item.author}</span>
        <span className={CartItemSinglePrice}>
          {item.price === '0' || item.price === 0 ? 'Free' : (
            <>
              Unit Price &nbsp;
              {CURRENCY}
              {item.price}
            </>
          )}
        </span>

        <div className={CartItemTotalWrapper}>
          <Counter
            value={item.quantity}
            onIncrement={() => addItem(item)}
            onDecrement={() => removeItem(item)}
          />

          <span className={CartItemTotalPrice}>
            {item.price === '0' || item.price === 0 ? 'Free' : (
              <>
                {CURRENCY}
                {(item.price * item.quantity).toFixed(2)}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
