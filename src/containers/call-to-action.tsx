import CTABlock from 'components/cta-block';
import Button from 'components/button';
import ArrowRight from 'assets/icons/arrow-right';
import CTAImage from 'assets/image/CTA-image.png';

export default function CallToAction() {
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

      <Button variant="elevation">
        <span className="mr-2">Browse Library</span> <ArrowRight width="13px" />
      </Button>
    </CTABlock>
  );
}
