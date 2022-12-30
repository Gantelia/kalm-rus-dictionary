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
        <option value="male">Мужской голос</option>
        <option value="female">Женский голос</option>
      </select>
    </div>
  );
}

export default VoiceSelect;
