from pathlib import Path
from fastapi.templating import Jinja2Templates
from app.core.jinja_filters import register_jinja_filters

BASE_DIR = Path(__file__).resolve().parent.parent

templates = Jinja2Templates(directory=BASE_DIR / "templates")

register_jinja_filters(templates)