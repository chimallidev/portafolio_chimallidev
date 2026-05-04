from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates
from app.proyectos.app_movil_soluciones_inteligentes.core.constants import APP_MOVIL_SOLUCIONES_INTELIGENTES_META, VERTICAL_SLIDER1_CONTENT

router = APIRouter()

@router.get("/portafolio/app-movil-soluciones-inteligentes", response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def app_movil_soluciones_inteligentes(request: Request):
    context = {
        "meta_app_movil_soluciones_inteligentes" : APP_MOVIL_SOLUCIONES_INTELIGENTES_META,
        "vertical_slider1_content" : VERTICAL_SLIDER1_CONTENT
    }
    try:
        return templates.TemplateResponse(request= request, name= "/proyectos/app_movil_soluciones_inteligentes/app_movil_soluciones_inteligentes.html", context= context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página de la aplicación móvil de soluciones inteligentes no ha sido encontrada.")