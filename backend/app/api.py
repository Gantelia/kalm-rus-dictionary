from text2voice import text_to_voice
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from pathlib import Path


app = FastAPI()

@app.get("/text2voice/{text}")
def convert_text_to_voice(text: str):
    filename = text_to_voice(text)
    return {"filename": filename}

@app.get("/download/{filename}")
def download_file(filename:str):
    file_path = Path('voices') / Path(filename)
    return FileResponse(file_path.as_posix(), filename=filename)
