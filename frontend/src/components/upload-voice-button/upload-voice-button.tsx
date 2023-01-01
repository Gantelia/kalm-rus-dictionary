import { ChangeEvent } from 'react';

type UploadVoiceButton = {
  isDisabled: boolean;
};

function UploadVoiceButton({ isDisabled }: UploadVoiceButton) {
  return (
    <>
      <input
        className="visually-hidden"
        type="file"
        id="load-file"
        accept=".wav"
        name="voice-file"
        onClick={(evt) => {
          evt.currentTarget.value = '';
        }}
        disabled={isDisabled}
      />
      <label className="load-file" htmlFor="load-file">
        Загрузить аудиофайл
      </label>
    </>
  );
}

export default UploadVoiceButton;
