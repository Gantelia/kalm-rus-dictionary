import { useState } from 'react';
import LoadFileButton from '../load-file-button/load-file-button';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  return (
    <form className="synthesis">
      <div className="synthesis__container">
        <LoadFileButton isDisabled={false} onFileLoad={setLoadedText} />
        <VoiceSelect />
      </div>
    </form>
  );
}

export default Synthesis;
