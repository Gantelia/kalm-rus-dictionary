import { forwardRef, Ref, useEffect, useState } from 'react';
import './textarea.scss';

type TextAreaProps = {
  fileText: string;
  isDisabled: boolean;
};

const Textarea = forwardRef(
  ({ fileText, isDisabled }: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
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
          value={input}
          ref={ref}
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
);

Textarea.displayName = 'SynthesisText';

export default Textarea;
