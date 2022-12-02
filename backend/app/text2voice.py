import torch
import torchaudio
from pathlib import Path
import hashlib

def text_to_voice(text: str, is_man: bool = True) -> str:
    filename = hashlib.md5(text.encode()).hexdigest() + ".wav"
    filepath = Path('voices') / Path(filename)
    if filepath.exists():
        return filename
    device = torch.device('cpu')
    local_file = 'v3_xal.pt'
    sample_rate = 48000
    if is_man:
        speaker = 'erdni'
    else:
        speaker = 'delghir'
    model = torch.package.PackageImporter(local_file).load_pickle("tts_models", "model")
    model.to(device)

    audio = model.apply_tts(text=text,
                            speaker=speaker,
                            sample_rate=sample_rate)

    audio_data = torch.unsqueeze(audio, dim=0)
    torchaudio.save(filepath.as_posix(), audio_data, sample_rate)

    return filename

if __name__ == '__main__':
    path = text_to_voice("Кезәнәс нааран мана өөрднр Цаһан Сар байриг темдглдг йоста")
    print(path)
