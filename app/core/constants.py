META = {
    "titulo" : "Chimallidev",
    "descripcion" : "Soy Desarrollador Web Full Stack especializado en 🐍 Python, junto con FastAPI y Jinja2 creo sitios web funcionales, eficientes y centrados en la experiencia del usuario."
}

#Open Graph
OG = {
    "titulo" : "Chimallidev | Portafolio",
    "descripcion" : "Soy desarrollador web Full Stack especializado en Python, junto con FastAPI y Jinja2 creo sitios web funcionales.",
    "image" : "https://portafolio-chimallidev.onrender.com/static/img/og_chimallidev_portafolio.png",
    "width" : 1200,
    "height" : 630,
    "url" : "https://portafolio-chimallidev.onrender.com/",
    "name" : "Chimallidev",
    "locale" : "es_MX"
}

#Botones correo
EMAIL_BUTTONS = [
    {
        "type": "button",

        "identifier": "copy-button",

        "copy_text": "chimalli.dev@gmail.com",

        "open_new_tab": False,

        "border_state": "False",

        "text": "Copiar"
    },
    {
        "type": "link",

        "url": "mailto:chimallidev.dev@gmail.com",

        "open_new_tab": False,

        "state": "turquoise",

        "border_state": "active",

        "text": "Contactar"
    }
]

#Boton WhatsApp
WHATSAPP_BUTTON = {
    "type": "link",

    "url": "https://wa.me/5215574606557?text=Hola%2C%20me%20interesa%20tu%20trabajo%20como%20desarrollador%20web%2C%20%C2%BFpodemos%20hablar%3F",

    "open_new_tab": True,

    "state": "turquoise",

    "border_state": "active",

    "text": "Contactar"
}

#Redes sociales
REDES = {
    "github" : "https://github.com/chimallidev",
    "youtube" : "https://www.youtube.com/@Chimallidev",
    "tik_tok" : "https://www.tiktok.com/@chimallidev",
    "instagram" : "https://www.instagram.com/chimallidev",
    "linkedin" : "https://www.linkedin.com/in/chimallidev"
}

#Habilidades
SKILLS = {
    "principal" : [
        {"title": "Python", "alt": "Logo de python","img": "/static/img/python.webp"}
    ],
    "frontend" : [
        {"title": "HTML", "alt": "Logo de html","img": "/static/img/html.webp"},
        {"title": "CSS", "alt": "Logo de css","img": "/static/img/css.webp"},
        {"title": "JS", "alt": "Logo de javascript","img": "/static/img/js.webp"}
    ],
    "backend" : [
        {"title": "FastAPI", "alt": "Logo de fastapi","img": "/static/img/fastapi.webp"},
        {"title": "Jinja2", "alt": "Logo de jinja2","img": "/static/img/jinja.webp"}
    ],
    "herramientas" : [
        {"title": "Docker", "alt": "Logo de docker","img": "/static/img/docker.webp"},
        {"title": "Git", "alt": "Logo de Git","img": "/static/img/git.webp"},
        {"title": "GitHub", "alt": "Logo de github","img": "/static/img/github.webp"}
    ]
}

#Enlaces link_item
PAGE_GITHUB_LINKS = {"url": "https://github.com/chimallidev/portafolio_chimallidev", "img" : "/static/img/github.webp", "title": "github", "alt": "Enlace a github"}


#Banners baner_item
BANNERS = {
    "html": {"img": "/static/img/html.webp", "title": "HTML", "color": "#fb6121"}
}

#Cards
CARDS = [
     {
        "title" : "Soluciones Inteligentes",
        "img" : "/static/img/soluciones_inteligentes_portafolio.webp",
        "img_title": "Soluciones Inteligentes",
        "img_alt": "página web soluciones inteligentes",
        "banners": [
            {"img": "/static/img/wordpress.webp", "title": "Wordpress", "color": "#2596be"},
            {"img": "/static/img/elementor.webp", "title": "Elementor", "color": "#92003a"}
        ],
        "description": "Página web de articulos de divulgación científca sobre estilo de vida fitness.",
        "links": [],
        "button": {
            "type": "link",

            "url": "/portafolio/soluciones_inteligentes",

            "open_new_tab": True,

            "state": "turquoise",

            "border_state": "inactive",

            "text": "Ver"
        }
     },
     {
        "title" : "app móvil Soluciones Inteligentes",
        "img" : "/static/img/app_soluciones_inteligentes_portafolio.webp",
        "img_title": "App móvil Soluciones Inteligentes",
        "img_alt": "App móvil soluciones inteligentes",
        "banners": [
            {"img": "/static/img/kotlin.webp", "title": "Kotlin", "color": "#6b75e1"}
        ],
        "description": "App móvil que centraliza artículos del sitio y añade nuevas funciones.",
        "links": [
            {"url": "https://github.com/chimallidev/solucionint", "img" : "/static/img/github.webp", "title": "github", "alt": "Enlace a github"}
        ],
        "button": {
            "type": "link",

            "url": "/portafolio/app-movil-soluciones-inteligentes",

            "open_new_tab": True,

            "state": "turquoise",

            "border_state": "inactive",

            "text": "Ver"
        }
     },
     {
        "title" : "Web de enlaces chimallidev",
        "img" : "/static/img/web_links_chimallidev_reflex.webp",
        "img_title": "link in bio",
        "img_alt": "página de enlaces de chimallidev hecha con reflex",
        "banners": [
            {"img": "/static/img/python.webp", "title": "Python", "color": "#2596be"},
            {"img": "/static/img/reflex.webp", "title": "Reflex", "color": "#6b53cc"}
        ],
        "description": "Plataforma web que reúne los enlaces a mis proyectos y contenido de programación.",
        "links": [
            {"url": "https://github.com/chimallidev/links_chimalli", "img" : "/static/img/github.webp", "title": "github", "alt": "Enlace a github"}
        ],
        "button": {
            "type": "link",

            "url": "https://chimallidev-links-web.vercel.app/",

            "open_new_tab": True,

            "state": "turquoise",

            "border_state": "inactive",

            "text": "Ver"
        }
     },
     {
        "title" : "Web de enlaces chimallidev v4",
        "img" : "/static/img/chimallidev_links_v4.webp",
        "img_title": "link in bio chimallidev",
        "img_alt": "página de enlaces de chimallidev versión 4",
        "banners": [
            {"img": "/static/img/python.webp", "title": "Python", "color": "#2596be"},
            {"img": "/static/img/fastapi.webp", "title": "FastAPI", "color": "#029a85"},
            {"img": "/static/img/jinja.webp", "title": "Jinja2", "color": "#c20706"},
            {"img": "/static/img/html.webp", "title": "HTML", "color": "#fb6121"},
            {"img": "/static/img/css.webp", "title": "CSS", "color": "#016fba"},
            {"img": "/static/img/js.webp", "title": "JS", "color": "#f0dc4e"}
        ],
        "description": "Sitio que concentra los enlaces a mis proyectos y contenido de programación, versión más reciente.",
        "links": [
            {"url": "https://github.com/chimallidev/chimallidev_links_2", "img" : "/static/img/github.webp", "title": "github", "alt": "Enlace a github"}
        ],
        "button": {
            "type": "link",

            "url": "/proyectos/chimallidev_enlaces_v4/",

            "open_new_tab": True,

            "state": "turquoise",

            "border_state": "inactive",

            "text": "Ver"
        }
     },
     {
        "title" : "ATL bikes",
        "img" : "/static/img/atl_bikes.webp",
        "img_title": "tienda mexicana de bicicletas",
        "img_alt": "tienda mexicana de bicicletas",
        "banners": [
            {"img": "/static/img/python.webp", "title": "Python", "color": "#2596be"},
            {"img": "/static/img/fastapi.webp", "title": "FastAPI", "color": "#029a85"},
            {"img": "/static/img/jinja.webp", "title": "Jinja2", "color": "#c20706"},
            {"img": "/static/img/html.webp", "title": "HTML", "color": "#fb6121"},
            {"img": "/static/img/css.webp", "title": "CSS", "color": "#016fba"},
            {"img": "/static/img/js.webp", "title": "JS", "color": "#f0dc4e"},
            {"img": "/static/img/postgresql.webp", "title": "PostgreSQL", "color": "#2596be"},
            {"img": "/static/img/supabase.webp", "title": "supabase", "color": "#3dce8d"}
        ],
        "description": "Inspirados en la fuerza y la fluidez del agua, ofrecemos bicicletas para cualquier terreno y aventura.",
        "button": {
            "type": "link",

            "open_new_tab": True,

            "state": "developing",

            "border_state": "inactive",

            "text": "En desarrollo"
        }
     }
]


#Banners: este sitio esta desarrollado con
SITIO_BANNERS = [
    {"img": "/static/img/html.webp", "title": "HTML", "color": "#fb6121"},
    {"img": "/static/img/css.webp", "title": "CSS", "color": "#016fba"},
    {"img": "/static/img/js.webp", "title": "JS", "color": "#f0dc4e"},
    {"img": "/static/img/python.webp", "title": "Python", "color": "#2596be"},
    {"img": "/static/img/jinja.webp", "title": "Jinja2", "color": "#c20706"},
    {"img": "/static/img/fastapi.webp", "title": "FastAPI", "color": "#029a85"}
]