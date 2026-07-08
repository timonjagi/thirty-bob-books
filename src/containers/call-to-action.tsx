import { useContext } from 'react';
import CTABlock from 'components/cta-block';
import Button from 'components/button';
import ArrowRight from 'assets/icons/arrow-right';
import CTAImage from 'assets/image/CTA-image.png';
import { DrawerContext } from 'contexts/drawer/drawer.provider';

export default function CallToAction() {
  const { dispatch } = useContext(DrawerContext);

  const openRequest = () => {
    dispatch({ type: 'SLIDE_CART', payload: { open: true } });
    dispatch({ type: 'TOGGLE_REQUEST_VIEW', payload: { showRequest: true } });
  };

  return (
    <CTABlock background={CTAImage}>
      <h3 className="font-normal text-white text-36px mb-6 text-center lg:text-left">
        Instant Access,
        <br />
        <span className="font-bold">Read Anywhere.</span>
      </h3>

      <p className="text-white text-center lg:text-left mb-10">
        Download ebooks to any device, read offline.
      </p>

      <div className="flex flex-col items-center lg:items-start">
        <Button variant="elevation" className="mb-15px">
          <span className="mr-2">Browse Library</span>{' '}
          <ArrowRight width="13px" />
        </Button>
        <Button variant="elevation" onClick={openRequest}>
          <span className="mr-2">Request a Book</span>{' '}
          <ArrowRight width="13px" />
        </Button>
      </div>
    </CTABlock>
  );
}
