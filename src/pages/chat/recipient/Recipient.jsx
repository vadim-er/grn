import "./Recipient.css";

import Button from "../../../@shared/Button";
import Card from "../../../@shared/card/Card";

import ErrorMessage from "../../../@shared/error-message/ErrorMessage";
import PhoneInput from "../../../@shared/phone-input/PhoneInput";
import useGetChatByPhone from "./effects/useGetChatByPhone";

function Recipient(props) {
  const { selectChat, selectedPhone } = props;
  let { getChatByPhone, isLoading, error } = useGetChatByPhone(selectChat);

  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = formData.get("phone");
    getChatByPhone(phone);
  };

  return (
    <div className="recipient-wrapper">
      <Card className="recipient-wrapper__content">
        <form onSubmit={handleSubmit}>
          <div className="form-components">
            <div className="flex">
              <div>Добавить контакт</div>
              <Button
                className="form-control recipient-form__btn"
                disabled={isLoading}
              >
                Продолжить
              </Button>
            </div>
            <PhoneInput
              required
              onKeyPress={handleKeyPress}
              defaultValue={selectedPhone}
            />
            <ErrorMessage error={error} />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Recipient;
