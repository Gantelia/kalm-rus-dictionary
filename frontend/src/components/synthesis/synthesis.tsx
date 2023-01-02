import { FormEvent, useState } from 'react';
import UploadTextButton from '../upload-text-button/upload-text-button';
import Player from '../player/player';
import Textarea from '../textarea/textarea';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';
import { isInputValid } from './synthesis-utils';
import { APIRoute, SHOW_ERROR_TIMEOUT, VoiceType } from '../../const';
import { api } from '../../services/services';
import ErrorMessage from '../error-message/error-message';
import Loader from '../loader/loader';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [voiceFile, setVoiceFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<unknown>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const text = formData.get('text');
    const voice = formData.get('voice');
    if (!voice || !text || !isInputValid(text as string)) {
      setIsValid(false);
      return;
    }
    formData.set('isMale', `${voice === VoiceType.Male}`);
    formData.delete('voice');
    const requestData = Object.fromEntries(formData);
    setIsValid(true);
    setIsLoading(true);
    try {
      const { data } = await api.post(APIRoute.Synthesis, requestData, {
        responseType: 'blob'
      });
      const wavUrl = window.URL.createObjectURL(data);
      setVoiceFile(wavUrl);
      setFileName(text as string);
    } catch (error) {
      setError(error);
      setTimeout(() => setError(null), SHOW_ERROR_TIMEOUT);
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="synthesis" onSubmit={(evt) => handleSubmit(evt)}>
      <div className="synthesis__container">
        <UploadTextButton isDisabled={isLoading} onFileLoad={setLoadedText} />
        <VoiceSelect isDisabled={isLoading} />
        <Textarea fileText={loadedText} isDisabled={isLoading} />
        <button
          className="synthesis__submit"
          type="submit"
          disabled={isLoading}
        >
          Синтез
        </button>
        {isLoading ? (
          <Loader>Подождите, идет синтез</Loader>
        ) : (
          <p className={`tip ${!isValid ? 'tip--error' : ''}`}>
            Допустимы только буквы калмыцкого алфавита и знаки препинания
          </p>
        )}
      </div>
      {error ? <ErrorMessage /> : null}
      <div className="synthesis__wrapper">
        <a
          className={`synthesis__download ${
            !voiceFile ? 'synthesis__download--disabled' : ''
          }`}
          href={voiceFile}
          download={fileName.substring(0, 10)}
        >
          Скачать
          <svg
            className="icon"
            aria-hidden="true"
            focusable="false"
            width="22"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M.5 22.5A1.5 1.5 0 012 21h18a1.5 1.5 0 110 3H2a1.5 1.5 0 01-1.5-1.5zm4.94-11.56a1.5 1.5 0 012.12 0l1.94 1.94V1.5a1.5 1.5 0 013 0v11.38l1.94-1.94a1.5 1.5 0 112.12 2.12l-4.5 4.5a1.5 1.5 0 01-2.12 0l-4.5-4.5a1.5 1.5 0 010-2.12z"
            />
          </svg>
        </a>
        <Player audioUrl={voiceFile || undefined} />
      </div>
    </form>
  );
}

export default Synthesis;
