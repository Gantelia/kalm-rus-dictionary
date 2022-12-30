import { useState } from 'react';
import LoadFileButton from '../load-file-button/load-file-button';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form className="synthesis">
      <div className="synthesis__container">
        <LoadFileButton isDisabled={isLoading} onFileLoad={setLoadedText} />
        <VoiceSelect isDisabled={isLoading} />
      </div>
    </form>
  );
}

export default Synthesis;
