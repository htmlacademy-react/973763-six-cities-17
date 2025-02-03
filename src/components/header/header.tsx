import HeaderNav from '../header-nav/header-nav';
import {Link} from 'react-router-dom';
import {RoutePath} from '../../routes';

type HeaderProps = {
  hasNavigation: boolean;
}

function Header({ hasNavigation }: HeaderProps): JSX.Element {
  return (
    <header className="header" data-testid='header-container'>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={RoutePath.INDEX}>
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {hasNavigation && <HeaderNav />}
        </div>
      </div>
    </header>
  );
}

export default Header;
