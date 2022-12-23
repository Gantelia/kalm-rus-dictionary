from text2voice import text_to_voice
from voice2text import voice_to_text
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoProcessor, AutoModelForCTC
import torch, io

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    text: str
    isMale: bool

class Audio(BaseModel):
    file_path: str


@app.on_event("startup")
def startup_event():
    gl_processor = AutoProcessor.from_pretrained(Path(__file__).parent.absolute() / Path('wav2vec-kalmyk'))
    gl_model = AutoModelForCTC.from_pretrained(Path(__file__).parent.absolute() / Path('wav2vec-kalmyk'))

    local_file = Path(__file__).parent.absolute() / Path('v3_xal.pt')
    tts_model = torch.package.PackageImporter(local_file).load_pickle("tts_models", "model")
    
    app.package = {
        "model": gl_model,
        "processor": gl_processor,
        "t2v_model": tts_model
    }


@app.post("/text2voice")
async def get_text_to_voice(data: Data):
    filename = text_to_voice(app.package, data.text, data.isMale)
    return {"filename": filename}

@app.post("/voice2text")
async def convert_text_from_voice(file: UploadFile):
    text = voice_to_text(file.filename, app.package)
    return {"text": text}

@app.get("/text2voice/{text}")
def convert_text_to_voice(text: str):
    filename = text_to_voice(text)
    return {"filename": filename}

@app.get("/download/{filename}")
def download_file(filename:str):
    file_path = Path('voices') / Path(filename)
    return FileResponse(file_path.as_posix(), filename=filename)
