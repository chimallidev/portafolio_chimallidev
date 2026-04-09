from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates
from app.core.constants import META, REDES, SKILLS, LINKS, BANNERS, CARDS, SITIO_BANNERS

router = APIRouter()


@router.get("/", response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def home(request: Request):
    context = {
        "meta": META,
        "redes" : REDES,
        "skills": SKILLS,
        "links": LINKS,
        "banners": BANNERS,
        "cards": CARDS,
        "sitio_banners":  SITIO_BANNERS
    }

    try: 
        return templates.TemplateResponse(request=request, name="index.html", context=context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail = "La página no ha sido encontrada.")