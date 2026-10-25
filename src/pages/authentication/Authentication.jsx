import "./Authentication.css";
import GreenApiLogo from "../../@assets/green-api-logo.svg";

import Input from "../../@shared/Input";
import Button from "../../@shared/Button";

import useAuth from "./effects/useAuth";
import ErrorMessage from "../../@shared/error-message/ErrorMessage";

function Authentication(props) {
  let { onAuthSuccess } = props;
  let { login, isLoading, error } = useAuth(onAuthSuccess);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;

    const formData = new FormData(event.currentTarget);
    const idInstance = formData.get("idInstance");
    const idTokenInstance = formData.get("idTokenInstance");

    login(idInstance, idTokenInstance);
  };

  let buttonTitle = isLoading ? "Авторизация" : "Продолжить";

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo_wrapper">
          <img src={GreenApiLogo} />
        </div>
        <h1 className="auth-page__title">Авторизоваться (TG)</h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <Input
              placeholder="idInstance"
              name="idInstance"
              className="--border"
              autoFocus
              required
            />
          </div>
          <div className="mt-10">
            <Input
              placeholder="idTokenInstance"
              className="--border"
              name="idTokenInstance"
              required
            />
          </div>
          <ErrorMessage error={error} />
          <Button
            className="form-control submit-btn mt-10"
            disabled={isLoading}
          >
            {buttonTitle}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
