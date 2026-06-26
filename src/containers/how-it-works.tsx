import React from 'react';
import FeatureBlock from 'components/feature-block';

const data = [
  {
    id: 1,
    background: '#feeec8',
    title: 'Browse Library',
    description: 'Explore our collection of ebooks across various genres and categories.',
  },
  {
    id: 2,
    background: '#ceeffe',
    title: 'Select Format',
    description: 'Choose your preferred format: PDF, EPUB, or MOBI for your device.',
  },
  {
    id: 3,
    background: '#d4f8c4',
    title: 'Add to Cart',
    description: 'Add ebooks to your cart and proceed to checkout when ready.',
  },
  {
    id: 4,
    background: '#d8dafe',
    title: 'Download',
    description: 'Receive instant access to download your ebooks after checkout.',
  },
];

export default function HowItWorks() {
  return (
    <div className="flex w-full px-20px md:p-30px py-40px rounded border border-gray-300 bg-white">
      <div className="feature-block-wrapper w-full grid grid-cols-1 gap-x-30px gap-y-40px md:grid-cols-2 xl:grid-cols-4 xxl:gap-30px">
        {data.map((item, index) => (
          <FeatureBlock
            key={item.id}
            title={item.title}
            description={item.description}
            counterBg={item.background}
            counter={index + 1}
            className="feature-block"
          />
        ))}
      </div>
    </div>
  );
}
