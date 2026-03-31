from fastapi import FastAPI
from app.core.templates import templates
from fastapi.staticfiles import StaticFiles
from app.routes.home import router as home_router


app = FastAPI()

#Archivos estáticos (infraestructura)
app.mount("/static", StaticFiles(directory = "app/static"), name = "static")

#Rutas
app.include_router(home_router)