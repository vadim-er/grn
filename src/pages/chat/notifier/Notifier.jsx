import { useEffect } from "react";
import greenApi from "../../../api/greenApi";

function Notifier(props) {
  const { chatId, setMessages } = props;

  useEffect(() => {
    let isMounted = true;
    const startPolling = async () => {
      while (isMounted) {
        try {
          const notification = await greenApi.receiveNotification();
          if (!notification) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            continue;
          }
          const { receiptId, body } = notification;
          if (
            body.typeWebhook === "incomingMessageReceived" &&
            body.messageData?.typeMessage === "textMessage"
          ) {
            const senderId = body.senderData.chatId;
            const text = body.messageData.textMessageData.textMessage;
            const serverTimestamp = body.timestamp * 1000;
            if (senderId === chatId) {
              setMessages((prev) => [
                ...prev,
                {
                  id: body.idMessage,
                  text: text,
                  status: "Получено",
                  timestamp: serverTimestamp,
                },
              ]);
            }
          }
          await greenApi.deleteNotification(receiptId);
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    };
    if (chatId) {
      startPolling();
    }
    return () => {
      isMounted = false;
    };
  }, [chatId]);

  return null;
}

export default Notifier;
