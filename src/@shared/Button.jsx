import "./Button.css";

function Button(props) {
  let className = "btn ";
  let { children, ...rest } = props;
  if (props.className) {
    className += props.className;
  }
  return (
    <button onClick={props.onClick} {...rest} className={className}>
      {props.children}
    </button>
  );
}

export default Button;
