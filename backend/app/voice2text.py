import torch
import librosa

def voice_to_text(file: str, package) -> str:
    processor = package['processor']
    model = package['model']
    #processor = AutoProcessor.from_pretrained(Path(__file__).parent.absolute() / Path('wav2vec-kalmyk'))
    #model = AutoModelForCTC.from_pretrained(Path(__file__).parent.absolute() / Path('wav2vec-kalmyk'))
    audio, _ = librosa.load(file, sr = 16000)
    audio = list(audio)
    with torch.no_grad():
        input_values = torch.tensor(audio).unsqueeze(0) #, device="cuda"
        logits = model(input_values).logits
    pred_ids = torch.argmax(logits, dim=-1)
    text = processor.batch_decode(pred_ids)[0]

    return text