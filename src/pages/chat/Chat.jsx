import "./Chat.css";

import { useState } from "react";

import PlusIcon from "../../@assets/plus-round-icon.svg";
import IconButton from "../../@shared/IconButton";
import Recipient from "./recipient/Recipient";
import Messages from "./messages/Messages";
import Notifier from "./notifier/Notifier";
import NewMessage from "./new-message/NewMessage";

let STATUSES = {
  IDLE: 1,
  CHANGING_RECIPIENT: 2,
  CHATTING: 3,
};

function Chat() {
  let [messages, setMessages] = useState([]);
  let [pageStatus, setPageStatus] = useState(STATUSES.IDLE);
  let [chat, setChat] = useState({
    id: null,
    phone: null,
  });

  let openRecipientForm = () => {
    setPageStatus(STATUSES.CHANGING_RECIPIENT);
  };

  let selectChat = (id, phone) => {
    setChat({
      id,
      phone,
    });
    setPageStatus(STATUSES.CHATTING);
  };

  const isChatActive = pageStatus === STATUSES.CHATTING;
  const isEditingRecipient =
    pageStatus === STATUSES.CHANGING_RECIPIENT || pageStatus === STATUSES.IDLE;

  return (
    <div className="chat-page">
      <Notifier chatId={chat.id} setMessages={setMessages} />
      {isEditingRecipient && (
        <Recipient selectChat={selectChat} selectedPhone={chat.phone} />
      )}
      {isChatActive && (
        <div className="chat-page__main">
          <div className="chat-page__header">
            <div className="ml-10">{chat.phone}</div>
            <IconButton
              iconSrc={PlusIcon}
              className="ml-auto"
              onClick={openRecipientForm}
            />
          </div>
          <div className="chat-page__body">
            <div className="chat-page__body_scroll">
              {messages.length === 0 && (
                <div className="placeholder">Начните общение</div>
              )}
              <Messages messages={messages} />
            </div>
          </div>
          <NewMessage chatId={chat.id} setMessages={setMessages} />
        </div>
      )}
    </div>
  );
}

export default Chat;
