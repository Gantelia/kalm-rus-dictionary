import { VoiceType } from '../../const';
import './voice-select.scss';

type VoiceSelectProps = {
  isDisabled: boolean;
};

function VoiceSelect({ isDisabled }: VoiceSelectProps) {
  return (
    <div className="select">
      <select
        className="select-control"
        aria-label="Выбор голоса"
        disabled={isDisabled}
        name="voice"
      >
        <option value={VoiceType.Male}>Мужской голос</option>
        <option value={VoiceType.Female}>Женский голос</option>
      </select>
    </div>
  );
}

export default VoiceSelect;
