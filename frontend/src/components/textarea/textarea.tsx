import { useEffect, useState } from 'react';
import './textarea.scss';

type TextAreaProps = {
  fileText: string;
  isDisabled: boolean;
};

function Textarea({ fileText, isDisabled }: TextAreaProps) {
  const [input, setInput] = useState('');

  /* Обновляет состояние поля ввода, чтобы <label> не падал на текст,
       если текст загружен из файла */
  useEffect(() => {
    setInput(fileText);
  }, [fileText]);

  return (
    <div className="textarea-container">
      <textarea
        className="textarea"
        onChange={({ target }) => setInput(target.value)}
        id="text"
        name="text"
        value={input.substring(0, 500)}
        required
        disabled={isDisabled}
      />
      <label
        /* Доп. класс нужен, чтобы <label> не накладывался на текст,
           когда поле не пустое */
        className={`label-placeholder textarea-label ${
          input && 'label-placeholder--offset'
        }`}
        htmlFor="text"
      >
        Введите текст
      </label>
      {input && (
        <button
          className="textarea__clear"
          type="button"
          onClick={() => setInput('')}
        >
          <span className="visually-hidden">Очистить</span>
        </button>
      )}
    </div>
  );
}

export default Textarea;
