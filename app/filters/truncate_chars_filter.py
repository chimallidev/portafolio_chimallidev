def truncate_chars(value: str, max_chars: int = 100) -> str:
    """
    Limita la cantidad de caracteres mostrados sin cortar palabras.

    El límite incluye los puntos suspensivos (...).

    Args:
        value: Texto a procesar.
        max_chars: Número máximo de caracteres permitidos.

    Returns:
        Texto truncado con puntos suspensivos si supera el límite.
    """

    if value is None:
        return ""

    text = str(value).strip()

    if len(text) <= max_chars:
        return text

    # Caso extremo: límites muy pequeños
    if max_chars <= 3:
        return "." * max_chars

    # Reservar espacio para los puntos suspensivos
    available_chars = max_chars - 3

    truncated = text[:available_chars]

    # Buscar la última palabra completa
    last_space = truncated.rfind(" ")

    if last_space > 0:
        truncated = truncated[:last_space]

    truncated = truncated.rstrip()

    # Si ya termina en punto, no añadir puntos suspensivos
    if truncated.endswith("."):
        return truncated

    return truncated + "..."