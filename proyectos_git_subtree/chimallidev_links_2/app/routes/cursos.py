from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from ..core.templates import templates
from ..core.constants import CURSOS_META, HEADER_LINKS, OG,CURSOS_GRATIS_BUTTONS, MUCHO_MAS_BUTTON, VOLVER_BUTTON
from ..utils.datetime import get_current_year

router = APIRouter()

@router.get('/cursos', name= 'cursos', response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def cursos(request: Request):
    context = {
        "meta": CURSOS_META,
        "og": OG,
        "header_links": HEADER_LINKS,
        "cursos_gratis_buttons": CURSOS_GRATIS_BUTTONS,
        "mucho_mas_button": MUCHO_MAS_BUTTON,
        "volver_button": VOLVER_BUTTON,
        "footer_year": get_current_year()
    }

    try:
        return templates.TemplateResponse(request= request, name= 'pages/cursos.html', context= context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página cursos no ha sido encontrada.")