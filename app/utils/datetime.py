from datetime import datetime
from zoneinfo import ZoneInfo


MEXICO_CITY_TIMEZONE = "America/Mexico_City"


def get_current_year() -> int:
    """
    Obtiene el año actual utilizando
    la zona horaria de Ciudad de México.
    """

    return datetime.now(
        ZoneInfo(MEXICO_CITY_TIMEZONE)
    ).year