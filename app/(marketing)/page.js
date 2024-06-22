import Image from 'next/image';

import { Hero } from '@/app/(marketing)/components/Hero';
import { PrimaryFeatures } from '@/app/(marketing)/components/PrimaryFeatures';
import { SecondaryFeatures } from '@/app/(marketing)/components/SecondaryFeatures';
import { CallToAction } from '@/app/(marketing)/components/CallToAction';
import { Reviews } from '@/app/(marketing)/components/Reviews';
import { Pricing } from '@/app/(marketing)/components/Pricing';
import { Faqs } from '@/app/(marketing)/components/Faqs';

export default async function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Reviews />
      <Pricing />
      <Faqs />
    </>
  );
}
