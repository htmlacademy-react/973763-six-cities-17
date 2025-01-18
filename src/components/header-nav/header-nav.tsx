import {Link} from 'react-router-dom';
import {RoutePath} from '../../routes';
import {getAutorizationStatus, getUserData, getFavoritesLoadingStatus, getFavoriteOffers} from '../../store/selectors';
import {useAppSelector} from '../../store/use-app-selector';
import {AuthorizationStatus, LoadingStatus} from '../../const';
import React, {useEffect} from 'react';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {fetchFavoritesAction, logoutAction} from '../../store/api-actions';

function HeaderNav(): JSX.Element {
  const userData = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAutorizationStatus);
  const favoritesLoadingStatus = useAppSelector(getFavoritesLoadingStatus);
  const isAuthed = authorizationStatus === AuthorizationStatus.AUTH;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.AUTH && (favoritesLoadingStatus === LoadingStatus.NotLoaded || favoritesLoadingStatus === LoadingStatus.Failed)) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, favoritesLoadingStatus, authorizationStatus]);

  const favoritesCount = useAppSelector(getFavoriteOffers).length;

  const handleLogoutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthed && userData ?
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={RoutePath.FAVORITES}>
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userData.avatarUrl})` }}>
                </div>
                <span className="header__user-name user__name">{userData.email}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={'#'} onClick={handleLogoutClick}>
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
