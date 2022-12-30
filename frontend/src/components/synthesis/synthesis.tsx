import { useRef, useState } from 'react';
import LoadFileButton from '../load-file-button/load-file-button';
import Textarea from '../textarea/textarea';
import VoiceSelect from '../voice-select/voice-select';
import './synthesis.scss';

function Synthesis() {
  const [loadedText, setLoadedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form className="synthesis">
      <div className="synthesis__container">
        <LoadFileButton isDisabled={isLoading} onFileLoad={setLoadedText} />
        <VoiceSelect isDisabled={isLoading} />
        <Textarea fileText={loadedText} isDisabled={isLoading} ref={textRef} />
      </div>
    </form>
  );
}

export default Synthesis;
