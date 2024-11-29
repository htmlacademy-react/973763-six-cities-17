import { userMock } from '../../mocks/user';
import { mockFavoriteOffers } from '../../mocks/offers';

function HeaderNav(): JSX.Element {
  const isAuthed = Object.keys(userMock).length > 0;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthed ?
          <>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userMock.avatarUrl})` }}>
                </div>
                <span className="header__user-name user__name">{userMock.email}</span>
                <span className="header__favorite-count">{mockFavoriteOffers.length}</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}

export default HeaderNav;
