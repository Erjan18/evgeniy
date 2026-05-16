from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import HistoricalFigure, Comment, Suggestion
from .serializers import (
    HistoricalFigureSerializer,
    CommentSerializer,
    SuggestionSerializer
)


class HistoricalFigureViewSet(viewsets.ModelViewSet):
    queryset = HistoricalFigure.objects.all()
    serializer_class = HistoricalFigureSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'biography', 'birth_place']
    ordering_fields = ['full_name', 'birth_year', 'created_at']


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        figure_id = self.request.query_params.get('figure')
        if figure_id:
            return self.queryset.filter(figure_id=figure_id)
        return self.queryset


class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(proposed_by=self.request.user)

    def get_queryset(self):
        if self.request.user.is_staff:
            return self.queryset
        return self.queryset.filter(proposed_by=self.request.user)