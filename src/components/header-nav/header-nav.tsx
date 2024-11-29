import { userMock } from '../../mocks/user';
import { mockFavoriteOffers } from '../../mocks/offers';
import {Link} from 'react-router-dom';
import {RoutePath} from '../../routes';

function HeaderNav(): JSX.Element {
  const isAuthed = Object.keys(userMock).length > 0;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthed ?
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={'#'}>
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userMock.avatarUrl})` }}>
                </div>
                <span className="header__user-name user__name">{userMock.email}</span>
                <span className="header__favorite-count">{mockFavoriteOffers.length}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={'#'}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={RoutePath.LOGIN}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}

export default HeaderNav;
