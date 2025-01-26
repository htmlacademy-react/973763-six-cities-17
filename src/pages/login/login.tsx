import Header from '../../components/header/header';
import SignIn from '../../components/sign-in/sign-in';
import {Link, useNavigate} from 'react-router-dom';
import {RoutePath} from '../../routes';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {getRandomArrayElement} from '../../utils';
import { CITIES_NAMES} from '../../const';
import { CityName } from '../../types';
import {useAppSelector} from '../../store/use-app-selector';
import {useEffect} from 'react';
import {getIsAuthed} from '../../store/slices/user/selectors.ts';
import {setActiveCityName} from '../../store/slices/app/app.ts';

function Login(): JSX.Element {
  const randomCityName = getRandomArrayElement<CityName>(CITIES_NAMES);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthed = useAppSelector(getIsAuthed);

  useEffect(() => {
    if (isAuthed) {
      navigate(RoutePath.INDEX);
    }
  }, [isAuthed, navigate]);

  return (
    <div className="page page--gray page--login">
      <Header hasNavigation={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <SignIn/>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={RoutePath.INDEX} className="locations__item-link" onClick={() => dispatch(setActiveCityName(randomCityName))}>
                <span>{randomCityName}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
