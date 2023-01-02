import './error-message.scss';

function ErrorMessage() {
  return (
    <p className="error">
      Что-то пошло не так...
      <br />
      Пожалуйста, попробуйте перезагрузить страницу
      <br /> или повторите попытку позже
    </p>
  );
}

export default ErrorMessage;
