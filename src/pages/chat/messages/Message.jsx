import "./Message.css";

function formatDate(timestamp) {
  const timeString = new Date(timestamp).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString.toString();
}

function Message(props) {
  let { message } = props;
  let className = message.isMyMessage ? "" : "--recieved";
  className += " chat__message";
  return (
    <div key={message.id} className={className}>
      {message.text}
      <div className="chat__message-details">
        <div className="chat__message_ts">{formatDate(message.timestamp)}</div>
        <div>{message.status}</div>
      </div>
    </div>
  );
}

export default Message;
