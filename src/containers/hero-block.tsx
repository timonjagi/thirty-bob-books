import React from 'react';
import Carousel from 'components/carousel/carousel';
import FictionImg from 'assets/image/fiction.png';
import NonFictionImg from 'assets/image/non-fiction.png';
import AcademicImg from 'assets/image/academic.png';
import SelfHelpImg from 'assets/image/self-help.png';

const data = [
  {
    id: 1,
    image: FictionImg,
    link: '#',
    title: 'Fiction',
  },
  {
    id: 2,
    image: NonFictionImg,
    link: '#',
    title: 'Non-Fiction',
  },
  {
    id: 3,
    image: AcademicImg,
    link: '#',
    title: 'Academic',
  },
  {
    id: 4,
    image: SelfHelpImg,
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
