import {useRef, ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {useNavigate} from 'react-router-dom';
import {PasswordLength} from '../../const';
import {regexForEmail, regexForPassword} from '../../utils';
import {RoutePath} from '../../routes';
import {loginAction} from '../../store/api-actions';
import './sign-in.css';

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordValidationError, setPasswordValidationErrorStatus] = useState<boolean>(false);
  const [isEmailValidationError, setEmailValidationErrorStatus] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailInvalid = (email: string) => !regexForEmail.test(email);
  const isPasswordInvalid = (password: string) => password.length <= PasswordLength.MIN || !regexForPassword.test(password);

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isEmailInvalid(evt.target.value)) {
      setEmailValidationErrorStatus(true);
    } else {
      setEmailValidationErrorStatus(false);
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPasswordInvalid(evt.target.value)) {
      setPasswordValidationErrorStatus(true);
    } else {
      setPasswordValidationErrorStatus(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current === null || passwordRef.current === null || isPasswordValidationError || isEmailValidationError) {
      return;
    }

    setIsSubmitting(true);
    dispatch(loginAction({
      email: loginRef.current.value,
      password: passwordRef.current.value
    })).unwrap().then(() => navigate(RoutePath.INDEX))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" onSubmit={handleSubmit}>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            ref={loginRef}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleEmailChange}
            disabled={isSubmitting}
          />
          {isEmailValidationError && <div className="validation_error">Email must match example@example.com!</div>}
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            ref={passwordRef}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handlePasswordChange}
            disabled={isSubmitting}
          />
          {isPasswordValidationError && <div className="validation_error">Password must contain 3 or more letters with numbers!</div>}
        </div>
        <button className="login__submit form__submit button" type="submit" disabled={isPasswordValidationError || isEmailValidationError || isSubmitting}>
          Sign in
        </button>
      </form>
    </section>
  );
}

export default SignIn;
