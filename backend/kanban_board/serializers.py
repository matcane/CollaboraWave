from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Board, Stage, Card


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class BoardModelSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Board
        fields = ['id', 'title', 'owner', 'created', 'description']
        id = serializers.ReadOnlyField()


class StageModelSerializer(serializers.ModelSerializer):
    cards = serializers.SerializerMethodField()

    class Meta:
        model = Stage
        fields = ['id', 'title', 'cards']
        id = serializers.ReadOnlyField()

    def get_cards(self, obj):
        cards = obj.cards.all()
        serialized_cards = CardModelSerializer(cards, many=True).data
        for card_data in serialized_cards:
            card_data.pop('stage', None)
        return serialized_cards


class CardModelSerializer(serializers.ModelSerializer):
    due_date = serializers.DateTimeField(required=False)

    class Meta:
        model = Card
        fields = ['id', 'title', 'stage', 'due_date', 'description']
        id = serializers.ReadOnlyField()

    def validate_due_date(self, value):
        if value and value < timezone.now() + timezone.timedelta(days=1):
            raise serializers.ValidationError("Data musi być przynajmniej jeden dzień do przodu")
        return value
