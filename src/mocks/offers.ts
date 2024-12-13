import { Offer, OfferDetail } from '../types';

export const mockOffers: Offer[] = [
  {
    'id': '764fe695-f984-422e-add8-e369f88ac21a',
    'title': 'Beautiful studio at great location',
    'type': 'apartment',
    'price': 469,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2
  },
  {
    'id': '76495-f984-422e-add8-e369f88ac21a',
    'title': 'Amazing Central Flat',
    'type': 'room',
    'price': 169,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2
  },
  {
    'id': 'e695-f984-422e-add8-e369f88ac21a',
    'title': 'Central Flat',
    'type': 'hotel',
    'price': 209,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2
  },
  {
    'id': '764fe-f984-422e-add8-e369f88ac21a',
    'title': 'Amazing Flat',
    'type': 'room',
    'price': 219,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2
  },
  {
    'id': '764fe695-f984-422e-add8-e36921a',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 269,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2
  },
  {
    'id': '08e802c2-e03a-4a4f-b937-ba55d1edfdbc',
    'title': 'The house among olive ',
    'type': 'apartment',
    'price': 496,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.858610000000006,
      'longitude': 2.330499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 1.7
  },
  {
    'id': '26ab3b22-9c77-4fa8-b7b6-f50627121be1',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 426,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 1.1
  },
  {
    'id': '695-f984-422e-add8-e369f88ac21a',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 209,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Hamburg',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2.2
  },
];

export const mockFavoriteOffers: Offer[] = [
  {
    'id': '764fe695-f984-422e-add8-e369f88ac21a',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 426,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.1
  },
  {
    'id': '08e802c2-e03a-4a4f-b937-ba55d1edfdbc',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 406,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 45.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 45.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 2.1
  },
  {
    'id': '26ab3b22-9c77-4fa8-b7b6-f50627121be1',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 426,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Hamburg',
      'location': {
        'latitude': 41.85661,
        'longitude': 12.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 41.834610000000005,
      'longitude': 12.335499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.1
  },
  {
    'id': '695-f984-422e-add8-e369f88ac21a',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 226,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 41.85661,
        'longitude': 22.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 41.834610000000005,
      'longitude': 22.335499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.1
  },
];

export const mockNearbyOffers: Offer[] = [
  {
    'id': '764fe695-f984-422e-add8-e369f88ac21a',
    'title': 'Waterfront with extraordinary view',
    'type': 'hotel',
    'price': 426,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.1
  },
];

export const mockOfferDetail: OfferDetail = {
  'id': '764fe695-f984-422e-add8-e369f88ac21a',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating', 'Wi-Fi', 'Kitchen'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': '/img/avatar-angelina.jpg',
    'isPro': false
  },
  'images': [
    'https://url-to-image/image.png', '/img/room.jpg', '/img/apartment-01.jpg', '/img/apartment-02.jpg'
  ],
  'maxAdults': 4
};
