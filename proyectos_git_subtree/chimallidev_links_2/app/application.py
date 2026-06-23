from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .routes.home import router as home_router
from .routes.cursos import router as cursos_router


BASE_DIR = Path(__file__).resolve().parent


def create_app() -> FastAPI:

    app = FastAPI()

    #Archivos estáticos (infraestructura)
    app.mount(
        "/static",
        StaticFiles(directory=BASE_DIR / "static"),
        name="static"
    )

    #Rutas
    app.include_router(home_router)
    app.include_router(cursos_router)

    return app