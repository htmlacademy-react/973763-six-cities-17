import Header from '../../components/header/header';
import SignIn from '../../components/sign-in/sign-in';

function Login(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header hasNavigation={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <SignIn/>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
