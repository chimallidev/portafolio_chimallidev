from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates
from app.proyectos.soluciones_inteligentes.core.constants import SOLUCIONES_INTELIGENTES_META, SLIDER_IMAGES

router = APIRouter()

@router.get("/portafolio/soluciones_inteligentes", response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def soluciones_inteligentes(request: Request):
    context = {
        "meta_soluciones_inteligentes": SOLUCIONES_INTELIGENTES_META,
        "slider_images": SLIDER_IMAGES
    }

    try: 
        return templates.TemplateResponse(request= request, name= "/proyectos/soluciones_inteligentes/soluciones_inteligentes.html", context= context)
    except: 
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página soluciones inteligentes no ha sido encontrada.")