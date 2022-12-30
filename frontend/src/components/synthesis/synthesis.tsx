import { useRef, useState } from 'react';
import LoadFileButton from '../load-file-button/load-file-button';
import Player from '../player/player';
import Textarea from '../textarea/textarea';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [voiceFile, setVoiceFile] = useState('/assets/test.wav');

  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form className="synthesis">
      <div className="synthesis__container">
        <LoadFileButton isDisabled={isLoading} onFileLoad={setLoadedText} />
        <VoiceSelect isDisabled={isLoading} />
        <Textarea fileText={loadedText} isDisabled={isLoading} ref={textRef} />
        <button className="synthesis__submit" type="submit">
          Синтез
        </button>
        <p className={`tip ${!isValid ? 'tip--error' : ''}`}>
          Допустимы только буквы калмыцкого алфавита и знаки препинания
        </p>
      </div>
      <div className="synthesis__wrapper">
        <a
          className={`synthesis__download ${
            !voiceFile ? 'synthesis__download--disabled' : ''
          }`}
          href={voiceFile}
          download={voiceFile}
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
        <Player audioUrl={voiceFile} />
      </div>
    </form>
  );
}

export default Synthesis;
