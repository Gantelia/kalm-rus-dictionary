import { useRef, useState } from 'react';
import LoadFileButton from '../load-file-button/load-file-button';
import Textarea from '../textarea/textarea';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

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
    </form>
  );
}

export default Synthesis;
