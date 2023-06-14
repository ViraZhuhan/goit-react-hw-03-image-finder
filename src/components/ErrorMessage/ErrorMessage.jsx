import { Message } from "./ErrorMessage.styled";


export default function ErrorMessage({ children }) {
  return (
    <Message>
      <h2>Oops! 😫</h2>
      <p>{children}</p>
    </Message>
  );
}