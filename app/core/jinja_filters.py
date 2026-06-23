from ..filters.truncate_chars_filter import truncate_chars


def register_jinja_filters(templates):
    """
    Registra todos los filtros personalizados de Jinja2.
    """

    templates.env.filters["truncate_chars"] = truncate_chars