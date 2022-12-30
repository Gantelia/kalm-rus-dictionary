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
      >
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
    </div>
  );
}

export default VoiceSelect;
