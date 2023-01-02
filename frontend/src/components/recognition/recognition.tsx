import { FormEvent, useState } from 'react';
import { APIRoute, SHOW_ERROR_TIMEOUT } from '../../const';
import { api } from '../../services/services';
import ErrorMessage from '../error-message/error-message';
import Loader from '../loader/loader';
import UploadVoiceButton from '../upload-voice-button/upload-voice-button';
import './recognition.scss';

function Recognition() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultFile, setResultFile] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [text, setText] = useState('');

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const userFile = formData.get('voice-file');
    if (!userFile) {
      return;
    }
    const userBlob = new Blob([userFile], { type: 'audio/wav' });
    if (userBlob.size === 0) {
      setIsValid(false);
      return;
    }
    formData.set('sound', userBlob);
    formData.delete('voice-file');
    setIsValid(true);
    setIsLoading(true);
    try {
      const { data } = await api.post(APIRoute.Recognition, formData);
      if (data.text) {
        setText(data.text);
      } else {
        setText('Невозможно распознать.');
      }
      const blob = new Blob([data.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setResultFile(url);
    } catch (error) {
      setError(error);
      setTimeout(() => setError(null), SHOW_ERROR_TIMEOUT);
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="recognition" onSubmit={(evt) => handleSubmit(evt)}>
      <div className="recognition__wrap">
        <UploadVoiceButton isDisabled={isLoading} />
        <button
          className="recognition__submit"
          type="submit"
          disabled={isLoading}
        >
          Распознать
        </button>
      </div>
      <div className="recognition__container">
        {!isValid && <p className="recognition__invalid">Файл не выбран</p>}
        {isLoading && (
          <Loader className="recognition__loader">
            Подождите, аудио распознаётся
          </Loader>
        )}
        <div
          className="recognition__result"
          aria-label="Результат распознавания"
        >
          {text}
        </div>
      </div>
      {error ? <ErrorMessage /> : null}
      <a
        className={`recognition__download ${
          !resultFile ? 'recognition__download--disabled' : ''
        }`}
        href={resultFile}
        download={text.substring(0, 10)}
      >
        Сохранить в файл
      </a>
    </form>
  );
}

export default Recognition;
