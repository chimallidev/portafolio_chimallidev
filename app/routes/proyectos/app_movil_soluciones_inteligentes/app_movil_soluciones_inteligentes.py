from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates

router = APIRouter()

@router.get("/portafolio/app-movil-soluciones-inteligentes", response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def app_movil_soluciones_inteligentes(request: Request):
    try:
        return templates.TemplateResponse(request= request, name= "/proyectos/app_movil_soluciones_inteligentes/app_movil_soluciones_inteligentes.html", context= {})
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página de la aplicación móvil de soluciones inteligentes no ha sido encontrada.")