---
language: xal
tags:
- speech
- audio
- automatic-speech-recognition
license: apache-2.0
---

## Info

This Wav2Vec2 model was first pretrained on 500 hours Kalmyk TV recordings and 1000 hours Mongolian speech recognition dataset. After that, the model was finetuned on a 300 hours [Kalmyk synthetic STT dataset](https://github.com/tugstugi/mongolian-nlp#datasets) created by a voice conversion model.
* 50% WER on a private test set created from Kalmyk TV recordnings
* on clean voice recordings, the model should have much lower WER
* voice conversion info
  * 300 hours [Kalmyk synthetic STT dataset](https://github.com/tugstugi/mongolian-nlp#datasets)
  * The source voice is a Kalmyk female voice TTS
  * Target voices are from the VCTK dataset
  * example data: https://twitter.com/tugstugi/status/1409111296897912835
  * each WAV has a different text created from Kalmyk books
