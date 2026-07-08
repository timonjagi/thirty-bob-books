import React from 'react';
import Carousel from 'components/carousel/carousel';
import FictionImg from 'assets/image/fiction.png';
import NonFictionImg from 'assets/image/non-fiction.png';
import AcademicImg from 'assets/image/academic.png';
import SelfHelpImg from 'assets/image/self-help.png';

const data = [
  {
    id: 1,
    image: FictionImg.src,
    link: '#',
    title: 'Fiction',
  },
  {
    id: 2,
    image: NonFictionImg.src,
    link: '#',
    title: 'Non-Fiction',
  },
  {
    id: 3,
    image: AcademicImg.src,
    link: '#',
    title: 'Academic',
  },
  {
    id: 4,
    image: SelfHelpImg.src,
    link: '#',
    title: 'Self-Help',
  },
];

export default function HeroBlock() {
  return (
    <div className="w-full relative my-35px">
      <Carousel data={data} itemClass="px-5px" />
    </div>
  );
}
