import greenApi from "../../../../api/greenApi";
import useAsyncAction from "../../../../hooks/useAsyncAction";

export const fetchChatByPhone = async (phone) => {
  try {
    let chat = await greenApi.checkAccount(phone);
    if (!chat.exist) {
      throw new Error("Пользователь не найден");
    }
    return chat.chatId;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Кажется что-то не так, проверьте введенные данные",
    );
  }
};

function useGetChatByPhone(onSuccesFindingChat) {
  let { run, isLoading, isError, error } = useAsyncAction(fetchChatByPhone);

  let getChatByPhone = async (phone) => {
    if (isLoading) return false;

    const chatId = await run(phone);
    if (chatId) {
      onSuccesFindingChat(chatId, phone);
    }
  };

  return {
    getChatByPhone,
    error,
    isLoading,
    isError,
  };
}

export default useGetChatByPhone;
