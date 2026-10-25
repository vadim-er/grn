function Input(props) {
  let className = "form-control ";
  if (props.className) {
    className += props.className;
  }
  return <input {...props} className={className} />;
}

export default Input;
