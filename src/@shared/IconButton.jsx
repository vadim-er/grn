import "./IconButton.css";

function IconButton(props) {
  let className = "icon-btn ";
  if (props.className) {
    className += props.className;
  }
  return (
    <button className={className} onClick={props.onClick}>
      {props.iconSrc && <img src={props.iconSrc} />}
      {props.children}
    </button>
  );
}

export default IconButton;
