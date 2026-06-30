from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates
from app.core.constants import META, EMAIL_BUTTONS, REDES, SKILLS, BANNERS, CARDS, SITIO_BANNERS, PAGE_GITHUB_LINKS, OG, WHATSAPP_BUTTON

router = APIRouter()


@router.get("/", name= "portafolio_home",response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def home(request: Request):
    context = {
        "meta": META,
        "og": OG,
        "email_buttons": EMAIL_BUTTONS,
        "redes" : REDES,
        "skills": SKILLS,
        "banners": BANNERS,
        "cards": CARDS,
        "sitio_banners":  SITIO_BANNERS,
        "page_github_links": PAGE_GITHUB_LINKS,
        "whatsapp_button": WHATSAPP_BUTTON
    }

    try: 
        return templates.TemplateResponse(request=request, name="index.html", context=context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail = "La página no ha sido encontrada.")