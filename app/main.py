from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.core.templates import templates
from app.routes.home import router as home_router
from app.routes.proyectos.soluciones_inteligentes.soluciones_inteligentes import (
    router as soluciones_inteligentes_router
)
from app.routes.proyectos.app_movil_soluciones_inteligentes.app_movil_soluciones_inteligentes import (
    router as app_movil_soluciones_inteligentes_router
)

from proyectos_git_subtree.chimallidev_links_2.app.application import (
    create_app as create_chimallidev_enlaces_app
)

from proyectos_git_subtree.atl_bikes.app.init_application import (
    create_app as create_atl_bikes_app
)


app = FastAPI()


chimallidev_enlaces_v4 = create_chimallidev_enlaces_app()

atl_bikes = create_atl_bikes_app()


# Archivos estáticos (infraestructura)
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="portafolio_static"
)


# Rutas
app.include_router(home_router)


# Proyectos
app.include_router(soluciones_inteligentes_router)
app.include_router(app_movil_soluciones_inteligentes_router)


# Proyectos git subtree
app.mount(
    "/proyectos/chimallidev_enlaces_v4",
    chimallidev_enlaces_v4
)

app.mount(
    "/proyectos/atl_bikes",
    atl_bikes
)