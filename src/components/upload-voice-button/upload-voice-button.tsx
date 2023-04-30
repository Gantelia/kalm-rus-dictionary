import './upload-voice-button.scss';

type UploadVoiceButton = {
  isDisabled: boolean;
};

function UploadVoiceButton({ isDisabled }: UploadVoiceButton) {
  return (
    <>
      <input
        className="visually-hidden"
        type="file"
        id="voice-file"
        accept=".wav"
        name="voice-file"
        onClick={(evt) => {
          evt.currentTarget.value = '';
        }}
        disabled={isDisabled}
      />
      <label className="load-voice-label" htmlFor="voice-file">
        Загрузить аудиофайл
      </label>
    </>
  );
}

export default UploadVoiceButton;
