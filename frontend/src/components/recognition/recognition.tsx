import { useState } from 'react';
import { blob } from 'stream/consumers';
import UploadVoiceButton from '../upload-voice-button/upload-voice-button';
import './recognition.scss';

function Recognition() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const fileData = JSON.stringify(result);
  const blob = new Blob([fileData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  return (
    <form className="recognition">
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
        {isLoading && (
          <p className="recognition__loader">Подождите, аудио распознаётся</p>
        )}
        <div
          className="recognition__result"
          aria-label="Результат распознавания"
        >
          {result}
        </div>
      </div>
      <a
        className={`recognition__download ${
          !result ? 'recognition__download--disabled' : ''
        }`}
        href={url}
        download
      >
        Сохранить в файл
      </a>
    </form>
  );
}

export default Recognition;
