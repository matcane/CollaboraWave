from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Board


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