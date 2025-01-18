import {useRef, ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch} from '../../store/use-app-dispatch';
import {useNavigate} from 'react-router-dom';
import {PasswordLength} from '../../const';
import {regexForEmail, regexForPassword} from '../../utils';
import {RoutePath} from '../../routes';
import {loginAction} from '../../store/api-actions';

const validationErrorStyle: React.CSSProperties = {
  position: 'absolute',
  left: '2px',
  marginTop: '-20px',
  color: '#B22222',
  fontSize: '12px',
};

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordValidationError, setPasswordValidationErrorStatus] = useState<boolean>(false);
  const [isEmailValidationError, setEmailValidationErrorStatus] = useState<boolean>(false);
  const [isFormDisabled, setFormDisabledStatus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isEmailInvalid = (email: string) => !regexForEmail.test(email);
  const isPasswordInvalid = (password: string) => password.length <= PasswordLength.MIN || !regexForPassword.test(password);

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isEmailInvalid(evt.target.value)) {
      setEmailValidationErrorStatus(true);
      setFormDisabledStatus(true);
    } else {
      setEmailValidationErrorStatus(false);
      setFormDisabledStatus(false);
    }
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isPasswordInvalid(evt.target.value)) {
      setPasswordValidationErrorStatus(true);
      setFormDisabledStatus(true);
    } else {
      setPasswordValidationErrorStatus(false);
      setFormDisabledStatus(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current === null || passwordRef.current === null || isPasswordValidationError || isEmailValidationError) {
      return;
    }

    setFormDisabledStatus(true);
    dispatch(loginAction({
      email: loginRef.current.value,
      password: passwordRef.current.value
    })).then((response)=> {
      setFormDisabledStatus(false);
      if (response.meta.requestStatus === 'fulfilled') {
        navigate(RoutePath.INDEX);
      }
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
          />
          {isEmailValidationError && <div style={validationErrorStyle}>Email must match example@example.com!</div>}
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
          />
          {isPasswordValidationError && <div style={validationErrorStyle}>Password must contain 3 or more letters with numbers!</div>}
        </div>
        <button className="login__submit form__submit button" type="submit" disabled={isFormDisabled}>
          Sign in
        </button>
      </form>
    </section>
  );
}

export default SignIn;
