import {Review} from '../types';

export const mockReviews: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-06-08T14:13:56.569Z',
    user: {
      name: 'Sarah Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true
    },
    comment: 'Lorem ipsum picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 3
  }
];


