import Input from "../Input";

const MAX_LENGTH = 12;

function PhoneInput(props) {
  return (
    <Input
      className="--border --blue"
      type="tel"
      id="phone"
      name="phone"
      placeholder="79991112222"
      inputMode="numeric"
      maxLength={MAX_LENGTH}
      {...props}
    />
  );
}

export default PhoneInput;
