import { useEffect, useState } from 'react';
import './textarea.scss';

type TextAreaProps = {
  fileText: string;
  isDisabled: boolean;
  onInteraction: () => void;
};

function Textarea({ fileText, isDisabled, onInteraction }: TextAreaProps) {
  const [input, setInput] = useState('');

  /* Обновляет состояние поля ввода, чтобы <label> не падал на текст,
       если текст загружен из файла */
  useEffect(() => {
    setInput(fileText);
    onInteraction();
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
        onFocus={onInteraction}
      />
      <label
        className={`label-placeholder textarea-label ${
          input && 'label-placeholder--shift'
        }`}
        htmlFor="text"
      >
        Введите текст
      </label>
      {input && (
        <button
          className="textarea__clear"
          type="button"
          onClick={() => {
            setInput('');
            onInteraction();
          }}
        >
          <span className="visually-hidden">Очистить</span>
        </button>
      )}
    </div>
  );
}

export default Textarea;
