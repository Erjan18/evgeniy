from historical_figures.models import HistoricalFigure


def add_test_figures():
    figures = [
        {
            "full_name": "Манас",
            "birth_year": 1700,
            "death_year": 1750,
            "birth_place": "Кыргызстан",
            "biography": "Легендарный герой кыргызского народа, объединитель кыргызов. Главный персонаж эпоса «Манас».",
            "image": None
        },
        {
            "full_name": "Курманджан датка",
            "birth_year": 1811,
            "death_year": 1907,
            "birth_place": "Алайская долина",
            "biography": "Выдающаяся государственная деятельница, правительница Алая, «Алайская царица». Сопротивлялась колонизации.",
        },
        {
            "full_name": "Токтогул Сатылганов",
            "birth_year": 1864,
            "death_year": 1933,
            "birth_place": "Кетмень-Тёбе",
            "biography": "Великий акын, композитор, поэт и демократ. Один из основоположников современной кыргызской литературы.",
        },
        {
            "full_name": "Чингиз Айтматов",
            "birth_year": 1928,
            "death_year": 2008,
            "birth_place": "Шекер, Кыргызстан",
            "biography": "Всемирно известный писатель, автор «Джамили», «Плахи», «И дольше века длится день».",
        },
    ]

    for data in figures:
        HistoricalFigure.objects.get_or_create(full_name=data["full_name"], defaults=data)

    print(f"Добавлено {len(figures)} исторических лиц!")


if __name__ == "__main__":
    add_test_figures()