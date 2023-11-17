import { useTranslations } from 'next-intl';
import Card, { CardProps } from '@/src/components/Card/Card';
import GemIcon from '@/src/components/icons/GemIcon';
import StarIcon from '@/src/components/icons/StarIcon';
import CardIcon from '@/src/components/icons/CardIcon';
import { FC } from 'react';

interface Props {
  params: {
    locale: string;
  };
}

const HomePage: FC<Props> = ({ params: { locale } }) => {
  const t = useTranslations('home-page');

  const cards: Array<CardProps> = [
    {
      icon: <GemIcon />,
      title: t('advantages-section.premium-products-section.heading'),
      description: t('advantages-section.premium-products-section.description'),
    },
    {
      icon: <StarIcon />,
      title: t('advantages-section.unique-products-section.heading'),
      description: t('advantages-section.unique-products-section.description'),
    },
    {
      icon: <CardIcon />,
      title: t('advantages-section.multiple-payment-options-section.heading'),
      description: t(
        'advantages-section.multiple-payment-options-section.description'
      ),
    },
  ];

  return (
    <>
      <ul className='flex flex-row justify-evenly items-center'>
        {cards.map((card) => {
          return (
            <Card
              key={card.title}
              {...card}
            />
          );
        })}
      </ul>
    </>
  );
};

export default HomePage;
