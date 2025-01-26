import {Link} from 'react-router-dom';
import {RoutePath} from '../../routes';
import './error.css';

function Error(): JSX.Element {
  return (
    <div className="error">
      <h1 className="error__number">404</h1>
      <div className="error__text">Not found</div>
      <Link to={RoutePath.INDEX}>Go back to main</Link>
    </div>
  );
}

export default Error;
