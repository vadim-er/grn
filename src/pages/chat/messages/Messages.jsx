import Message from "./Message";

function Messages(props) {
  let { messages } = props;
  return messages.map((message) => {
    return <Message key={message.id} message={message} />;
  });
}

export default Messages;
