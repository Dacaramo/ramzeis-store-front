import { FC, ReactNode } from 'react';

export interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ icon, title, description }) => {
  return (
    <li className='card w-96 bg-base-200'>
      <figure className='mt-[2rem] text-[50px]'>{icon}</figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default Card;
