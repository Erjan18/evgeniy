from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import HistoricalFigure, Comment, Suggestion

User = get_user_model()

class HistoricalFigureSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalFigure
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Comment
        fields = ['id', 'figure', 'user', 'user_id', 'text', 'created_at']
        read_only_fields = ['user', 'created_at']


class SuggestionSerializer(serializers.ModelSerializer):
    proposed_by = serializers.ReadOnlyField(source='proposed_by.username')
    proposed_by_id = serializers.ReadOnlyField(source='proposed_by.id')

    class Meta:
        model = Suggestion
        fields = '__all__'
        read_only_fields = ['proposed_by', 'status', 'created_at']