import { FormEvent, useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CitiesList, EMAIL_REG_EXP, MIN_LENGTH_OF_PASSWORD, TIMEOUT_SHOW_ERROR } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/offers-slice';
import { getAuthorizationStatus } from '../../store/selectors';
import { getRandomEnumValue } from '../../utils';

export default function Login() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const [isPasswordValidate, setPasswordValidate] = useState(false);
  const city = useMemo(() => getRandomEnumValue(CitiesList), []);
  const emptyFormState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(emptyFormState);

  const fieldChangeHandle = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordValidate(false);

    if (formData.password.length > MIN_LENGTH_OF_PASSWORD && EMAIL_REG_EXP.test(formData.email)) {
      dispatch(loginAction({ email: formData.email, password: formData.password }));
      setFormData(emptyFormState);
    } else {
      setPasswordValidate(true);
      setTimeout(
        () => (setPasswordValidate(false)),
        TIMEOUT_SHOW_ERROR,
      );
    }
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (

    <div className='page page--gray page--login'>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' action='#' method='post' onSubmit={handleFormSubmit}>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input className='login__input form__input' type='email' name='email' placeholder='Email' required onChange={fieldChangeHandle} />
              </div>
              {isPasswordValidate ? <h3 style={{ 'color': 'red' }}>Login or password is incorrect</h3> : ''}
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input className='login__input form__input' type='password' name='password' placeholder='Password' required onChange={fieldChangeHandle} />
              </div>
              <button className='login__submit form__submit button' type='submit'>Sign in</button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(changeCity(city.toLocaleLowerCase()))}
              >
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
