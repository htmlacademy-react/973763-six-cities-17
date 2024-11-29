import MainPage from '../../pages/main/main';
import { Offer } from '../../types';
import { mockOffers } from '../../mocks/offers';

type AppProps = {
  offers?: Offer[];
}

function App({offers = mockOffers}: AppProps): JSX.Element {

  return (<MainPage offers={offers} />);
}

export default App;
