import MainPage from '../../pages/main/main';

type AppProps = {
  citiesCount: number;
}

function App({citiesCount}: AppProps): JSX.Element {

  return (<MainPage citiesCount={citiesCount}/>);
}

export default App;
