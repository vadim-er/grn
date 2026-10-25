import "./NewMessage.css";

import IconButton from "../../../@shared/IconButton";
import Input from "../../../@shared/Input";
import SendMessageIcon from "../../../@assets/telegram-icon.svg";

import greenApi from "../../../api/greenApi";

function getId() {
  return Date.now() + "@myid";
}

function NewMessage(props) {
  let { chatId, setMessages } = props;
  let sendMessage = async (e) => {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    const text = formData.get("message");
    form.reset();
    let tempId = getId();
    try {
      setMessages((state) => {
        return [
          ...state,
          {
            text,
            timestamp: Date.now(),
            id: tempId,
            status: "Оправляется...",
            isMyMessage: true
          },
        ];
      });
      let response = await greenApi.sendMessage(chatId, text);
      let messageId = response.idMessage;
      setMessages((state) => {
        return state.map((message) => {
          if (tempId === message.id) {
            return {
              ...message,
              id: messageId,
              status: "Отправлено",
            };
          }
          return message;
        });
      });
    } catch (error) {
      setMessages((state) => {
        return state.map((message) => {
          if (tempId === message.id) {
            return {
              ...message,
              id,
              status: "Ошибка доставки",
            };
          }
          return message;
        });
      });
    }
  };
  return (
    <div className="chat-page__footer">
      <form className="new-message-form" onSubmit={sendMessage}>
        <Input placeholder="Message" required name="message" />
        <IconButton iconSrc={SendMessageIcon} />
      </form>
    </div>
  );
}

export default NewMessage;
