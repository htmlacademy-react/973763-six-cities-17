import {MockStore, configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch} from './mocks';
import {Provider} from 'react-redux';
import {State} from '../store/types';
import {createAPI} from '../services/api';
// import {MemoryHistory, createMemoryHistory} from 'history';
// import HistoryRouter from './/components/history-route/history-route';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

// export function withHistory(component: JSX.Element, history?: MemoryHistory) {
//   const memoryHistory = history ?? createMemoryHistory();
//
//   return (
//     <HistoryRouter history={memoryHistory}>
//       {component}
//     </HistoryRouter>
//   );
// }

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
}
