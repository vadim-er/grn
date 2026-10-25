import "./ErrorMessage.css";

function ErrorMessage(props) {
  let { error } = props;
  return error ? <p className="error-message">{error}</p> : null;
}

export default ErrorMessage;
