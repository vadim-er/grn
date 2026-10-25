import greenApi from "../../../api/greenApi";
import useAsyncAction from "../../../hooks/useAsyncAction";

export const checkCredentials = async (idInstance, idTokenInstance) => {
  try {
    greenApi.setCredentials(idInstance, idTokenInstance);
    const accountStatus = await greenApi.getStateInstance();
    if (accountStatus?.stateInstance !== "authorized") {
      throw new Error("Похоже ваш инстанс не в статусе authorized");
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Кажется что-то не так, проверьте введенные данные",
    );
  }
};

function useAuth(onAuthSuccess) {
  let { run, isLoading, isError, error } = useAsyncAction(checkCredentials);

  let login = async (idInstance, idTokenInstance) => {
    if (isLoading) return false;

    const success = await run(idInstance, idTokenInstance);
    if (success) {
      onAuthSuccess();
    }
  };

  return {
    login,
    error,
    isLoading,
    isError,
  };
}

export default useAuth;
