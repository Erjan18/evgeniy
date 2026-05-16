from django.contrib import admin
from django.utils.html import format_html
from .models import HistoricalFigure, Comment, Suggestion


@admin.register(HistoricalFigure)
class HistoricalFigureAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'birth_year', 'death_year', 'birth_place', 'created_at')
    search_fields = ('full_name', 'biography')
    list_filter = ('birth_year', 'created_at')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'figure', 'created_at', 'text_short')
    list_filter = ('created_at',)
    search_fields = ('text',)

    def text_short(self, obj):
        return (obj.text[:80] + "...") if len(obj.text) > 80 else obj.text

    text_short.short_description = "Комментарий"


@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'proposed_by', 'status_colored', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('full_name', 'biography')
    actions = ['approve_and_create_figure']

    # Действие: Одобрить и создать историческое лицо
    def approve_and_create_figure(self, request, queryset):
        created_count = 0
        for suggestion in queryset.filter(status='pending'):
            HistoricalFigure.objects.create(
                full_name=suggestion.full_name,
                birth_year=suggestion.birth_year,
                death_year=suggestion.death_year,
                birth_place=suggestion.birth_place,
                biography=suggestion.biography,
                # image можно добавить вручную позже
            )
            suggestion.status = 'approved'
            suggestion.save()
            created_count += 1

        self.message_user(request, f'✅ Успешно создано {created_count} исторических лиц из предложений.')

    approve_and_create_figure.short_description = "✅ Одобрить и создать историческое лицо"
    approve_and_create_figure.allowed_permissions = ('change',)

    # Красивое отображение статуса
    def status_colored(self, obj):
        colors = {
            'pending': 'orange',
            'approved': 'green',
            'rejected': 'red'
        }
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            colors.get(obj.status, 'black'),
            obj.get_status_display()
        )

    status_colored.short_description = 'Статус'