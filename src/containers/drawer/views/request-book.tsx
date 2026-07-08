import { useContext, useState } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { Scrollbar } from 'components/scrollbar';
import ArrowLeft from 'assets/icons/arrow-left';
import Input from 'components/input';
import TextArea from 'components/textarea';
import Button from 'components/button';
import RequestSubmit from './request-submit';

const initialState = {
  title: '',
  author: '',
  name: '',
  email: '',
  notes: '',
};

export default function RequestBook() {
  const { dispatch } = useContext(DrawerContext);
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hideRequest = () => {
    dispatch({
      type: 'TOGGLE_REQUEST_VIEW',
      payload: {
        showRequest: false,
      },
    });
  };

  const submitRequest = async () => {
    const { title, author, name, email, notes } = formData;
    if (!title.trim()) {
      setError({
        field: 'title',
        message: 'Please tell us which book you would like.',
      });
      return;
    }
    if (!email.trim()) {
      setError({
        field: 'email',
        message: 'Email is required so we can notify you.',
      });
      return;
    }

    setLoading(true);

    const res = await fetch('/api/request-book', {
      method: 'POST',
      body: JSON.stringify({
        title,
        author,
        name,
        email,
        notes,
      }),
    });
    if (res.status === 200) {
      setSuccess(true);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
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
    return <RequestSubmit />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideRequest}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-bold text-24px m-0">Request a Book</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
          <p className="text-14px text-gray-700 mb-20px">
            Can&apos;t find a title in our library? Let us know and we&apos;ll
            try to source it for you.
          </p>

          <div className="flex flex-col mb-20px">
            <Input
              placeholder="Book title *"
              className="mb-10px"
              name="title"
              value={formData.title}
              onChange={onChange}
            />
            {error?.field === 'title' && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error.message}
              </p>
            )}
            <Input
              placeholder="Author (optional)"
              className="mb-10px"
              name="author"
              value={formData.author}
              onChange={onChange}
            />
            <Input
              placeholder="Your name"
              className="mb-10px"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
            <Input
              placeholder="Email for notifications *"
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
            <TextArea
              placeholder="Anything else? (optional)"
              className="mb-10px"
              name="notes"
              value={formData.notes}
              onChange={onChange}
            />
            {error === true && (
              <p className="text-12px font-semibold text-error pt-10px pl-15px">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        <Button className="big w-full" onClick={submitRequest} loading={loading}>
          Send Request
        </Button>
      </div>
    </div>
  );
}
