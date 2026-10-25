import "./Main.css";

function MainLayout(props) {
  return (
    <div className="layout">
      {props.children}
    </div>
  );
}

export default MainLayout;
