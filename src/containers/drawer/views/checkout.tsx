import { useContext, useState } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { Scrollbar } from 'components/scrollbar';
import ArrowLeft from 'assets/icons/arrow-left';
import Input from 'components/input';
import Button from 'components/button';
import { useCart } from 'contexts/cart/cart.provider';
import OrderSubmit from './order-submit';
import {
  InputBase,
  TextBoxCommonBase,
  TextBoxEnable,
} from 'components/utils/theme';

const initialState = {
  email: '',
  name: '',
};

export default function Checkout() {
  const { dispatch } = useContext(DrawerContext);
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items, calculatePrice, clearCart } = useCart();

  const hideCheckout = () => {
    dispatch({
      type: 'TOGGLE_CHECKOUT_VIEW',
      payload: {
        showCheckout: false,
      },
    });
  };

  const submitOrder = async () => {
    const { email, name } = formData;
    if (!email.trim()) {
      setError({
        field: 'email',
        message: 'Email is required for download links',
      });
      return;
    }

    setLoading(true);

    const res = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        items: items
          .map((item) => `${item.title} (${item.format})`)
          .toString(),
        email: email,
        name: name,
        total: calculatePrice(),
      }),
    });
    if (res.status === 200) {
      setSuccess(true);
      clearCart();
      setLoading(false);
    } else {
      setError(true);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (success) {
    return <OrderSubmit />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCheckout}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-24px m-0">Checkout</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
          <div className="flex flex-col mb-45px">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Download Information
            </span>
            <Input
              placeholder="Your Name"
              className="mb-10px"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
            <Input
              placeholder="Email for download links"
              className="mb-10px"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
            />
            {error?.field === 'email' && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              Order Summary
            </span>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-10px">
                <span className="text-14px">{item.title}</span>
                <span className="text-14px text-gray-500 uppercase">{item.format}</span>
              </div>
            ))}
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        <Button className="big w-full" onClick={submitOrder} loading={loading}>
          Download Ebooks
        </Button>
      </div>
    </div>
  );
}
