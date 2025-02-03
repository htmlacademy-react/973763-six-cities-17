import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import {makeFakeCityLocation} from '../mocks/mocks';
import {MutableRefObject} from 'react';
import React from 'react';
import {Map} from 'leaflet';

describe('Hook: useMap', () => {
  it('should return 1 element', () => {
    const city = makeFakeCityLocation();
    const mapRef = React.createRef() as MutableRefObject<HTMLElement>;
    mapRef.current = document.createElement('section');

    const { result } = renderHook(() => useMap(mapRef, city));
    const map = result.current;

    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(Map);
  });
});
