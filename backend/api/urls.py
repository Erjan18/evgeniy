from django.urls import path, include
from rest_framework.routers import DefaultRouter
from historical_figures.views import HistoricalFigureViewSet, CommentViewSet, SuggestionViewSet

router = DefaultRouter()
router.register(r'figures', HistoricalFigureViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'suggestions', SuggestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]