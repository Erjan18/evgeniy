from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timezone import now

User = get_user_model()  # ← Это важно!


class HistoricalFigure(models.Model):
    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    birth_year = models.IntegerField(null=True, blank=True, verbose_name="Год рождения")
    death_year = models.IntegerField(null=True, blank=True, verbose_name="Год смерти")
    birth_place = models.CharField(max_length=255, null=True, blank=True, verbose_name="Место рождения")
    biography = models.TextField(verbose_name="Биография")
    image = models.ImageField(upload_to='figures/', null=True, blank=True, verbose_name="Фото")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Историческое лицо"
        verbose_name_plural = "Исторические лица"
        ordering = ['full_name']

    def __str__(self):
        return self.full_name


class Comment(models.Model):
    figure = models.ForeignKey(HistoricalFigure, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")  # ← Исправлено
    text = models.TextField(verbose_name="Комментарий")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} → {self.figure.full_name[:30]}"


class Suggestion(models.Model):
    STATUS_CHOICES = [
        ('pending', 'На рассмотрении'),
        ('approved', 'Одобрено'),
        ('rejected', 'Отклонено'),
    ]

    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    birth_year = models.IntegerField(null=True, blank=True, verbose_name="Год рождения")
    death_year = models.IntegerField(null=True, blank=True, verbose_name="Год смерти")
    birth_place = models.CharField(max_length=255, null=True, blank=True, verbose_name="Место рождения")
    biography = models.TextField(verbose_name="Биография")
    proposed_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Предложил")  # ← Исправлено
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Предложение"
        verbose_name_plural = "Предложения"

    def __str__(self):
        return f"{self.full_name} ({self.proposed_by.username})"