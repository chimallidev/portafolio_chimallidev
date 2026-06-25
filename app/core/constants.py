#META
META = {
    "titulo": "Desarrollador",
    "descripcion": "Chimallidev es un desarrollador web Full Stack especializado en Python, FastAPI y Jinja2. Descubre recursos, proyectos y contenido sobre programación y desarrollo web."
}

#CURSOS META
CURSOS_META = {
    "titulo": "Recursos gratis",
    "descripcion": "Chimallidev es un desarrollador web Full Stack especializado en Python, FastAPI y Jinja2. Descubre recursos, proyectos y contenido sobre programación y desarrollo web."
}

#Open Graph
OG = {
    "titulo" : "Chimallidev | Enlaces",
    "descripcion" : "Todos mis enlaces en un solo lugar. Contenido sobre Python, FastAPI, Jinja2, desarrollo web, recursos de programación y proyectos de Chimallidev.",
    "image" : "chimallidev-links.onrender.com/static/img/og_chimallidev_links.png",
    "width" : 1199,
    "height" : 675,
    "url" : "chimallidev-links.onrender.com/",
    "name" : "Chimallidev",
    "locale" : "es_MX"
}

#HEADER LINKS
HEADER_LINKS = [
    {
        "svg_id": "icon-github",
        "url": "https://github.com/chimallidev",
        "size": "20px",
        "color": "var(--third-color)",
        "background": "var(--fourth-color)",
        "hover_color": "var(--third-color)",
        "hover_background": "var(--secondary-color)",
        "active_color": "var(--main-color)",
        "active_background": "var(--third-color)",
        "name": "enlace a github"
    },
    {
        "svg_id": "icon-twitter-x",
        "url": "https://x.com/chimallidev",
        "size": "20px",
        "color": "var(--third-color)",
        "background": "var(--fourth-color)",
        "hover_color": "var(--third-color)",
        "hover_background": "var(--secondary-color)",
        "active_color": "var(--main-color)",
        "active_background": "var(--third-color)",
        "name": "enlace a x"
    },
    {
        "svg_id": "icon-facebook",
        "url": "https://www.facebook.com/people/Chimallidev/61574578197815",
        "size": "20px",
        "color": "var(--third-color)",
        "background": "var(--fourth-color)",
        "hover_color": "var(--third-color)",
        "hover_background": "var(--secondary-color)",
        "active_color": "var(--main-color)",
        "active_background": "var(--third-color)",
        "name": "enlace a facebook"
    },
    {
        "svg_id": "icon-linkedin",
        "url": "https://www.linkedin.com/in/chimallidev",
        "size": "20px",
        "color": "var(--third-color)",
        "background": "var(--fourth-color)",
        "hover_color": "var(--third-color)",
        "hover_background": "var(--secondary-color)",
        "active_color": "var(--main-color)",
        "active_background": "var(--third-color)",
        "name": "enlace a x"
    }
]

#Botones principales
MAIN_BUTTONS = [
    {
        "type": "link",

        "url": "/cursos",

        "open_new_tab": False,

        "state": "turquoise",

        "border_state": "active",

        "svg_id": "icon-code-slash",

        "title": "Cursos",

        "description": "Recursos gratis de programación"
    },
    {
        "type": "link",

        "url": "https://www.youtube.com/@Chimallidev",

        "open_new_tab": True,

        "svg_id": "icon-youtube",

        "title": "Youtube",

        "description": "Videos sobre programación"
    },
    {
       "type": "link",

        "url": "https://tiktok.com/@chimallidev",

        "open_new_tab": True,

        "svg_id": "icon-tiktok",

        "title": "Tik Tok",

        "description": "Videos cortos sobre pogramación"
    },
    {
        "type": "link",

        "url": "https://instagram.com/chimallidev",

        "open_new_tab": True,

        "svg_id": "icon-instagram",

        "title": "Instagram",

        "description": "Mi día a día como programador"
    },
    {
        "type": "link",

        "url": "https://ko-fi.com/chimallidev",

        "open_new_tab": True,

        "svg_id": "icon-cup-hot-fill",

        "title": "Invítame un café",

        "description": "¿Quieres apoyarme?"
    }
]

#Botones de contacto
CONTACTO_BUTTONS = [
    {
        "type": "button",

        "identifier": "copy-button",

        "copy_text": "chimalli.dev@gmail.com",

        "svg_id": "icon-clipboard",

        "title": "Copiar",

        "description": "chimalli.dev@gmail.com"
    },
    {
        "type": "link",

        "url": "mailto:chimalli.dev@gmail.com",

        "open_new_tab": True,

        "svg_id": "icon-envelope-fill",

        "title": "Contactar",

        "description": "Envíame un correo."
    }
]

#Botones cursos gratis
CURSOS_GRATIS_BUTTONS = [
    {
        "type": "link",

        "url": "https://www.youtube.com/playlist?list=PLiIUrXdfXvdX7EskTVa2rVB_ssGsVT1V6",

        "open_new_tab": True,

        "svg_id": "icon-python",

        "title": "Python desde cero",

        "description": "Fundamentos de Python"
    },
    {
        "type": "link",

        "url": "https://www.youtube.com/playlist?list=PLiIUrXdfXvdXWpi__sbjxlcmE8ZjW-1ML",

        "open_new_tab": True,

        "svg_id": "icon-python-ejercicios",

        "title": "Python: Ejercicios Resueltos",

        "description": "Aprende paso a paso"
    },
    {
        "type": "link",

        "url": "{{url_for('cursos')}}",

        "open_new_tab": False,

        "svg_id": "icon-empty",

        "title": "Próximamente",

        "description": "En desarrollo"
    }
]

#Botones Mucho más en 
MUCHO_MAS_BUTTON = {
    "type": "link",

    "url": "https://www.youtube.com/@Chimallidev",

    "open_new_tab": True,

    "svg_id": "icon-youtube",

    "title": "Youtube",

    "description": "Videos sobre programación"
}

#Boton volver
VOLVER_BUTTON = {
    "type": "link",

    "url": "/",

    "open_new_tab": False,

    "svg_id": "icon-home",

    "title": "Volver",

    "description": "Sitio de enlaces de Chimallidev"
}

#Cards destacados
DESTACADOS_CARDS = [
    {   
        'id': 'card-python',
        'image': 'static/img/Soluciones_Inteligentes.webp',
        'url': 'https://portafolio-chimallidev.onrender.com/portafolio/soluciones_inteligentes',
        'description': 'Sitio web de artículos de diulgación científica sobre ejercicio y habitos saludables.'
    },
    {
        'id': 'card-python',
        'image': 'static/img/app_soluciones_inteligentes.webp',
        'url': 'https://portafolio-chimallidev.onrender.com/portafolio/app-movil-soluciones-inteligentes',
        'description': 'App móvil que centraliza artículos de Soluciones Inteligentes y añade nuevas funciones.'
    }
]