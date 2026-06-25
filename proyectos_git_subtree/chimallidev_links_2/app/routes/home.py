from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from ..core.templates import templates
from ..core.constants import META, HEADER_LINKS, OG,MAIN_BUTTONS, DESTACADOS_CARDS, CONTACTO_BUTTONS
from ..utils.datetime import get_current_year

router = APIRouter()

@router.get("/", name= "chimallidev_links_v4_home",response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def home(request: Request):
    context = {
        "meta": META,
        "og": OG,
        "header_links": HEADER_LINKS,
        "main_buttons": MAIN_BUTTONS,
        "contacto_buttons": CONTACTO_BUTTONS,
        "destacados_cards": DESTACADOS_CARDS,
        "footer_year": get_current_year()
    }

    try:
        return templates.TemplateResponse(request= request, name= "index.html", context= context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página no ha sido encontrada.")