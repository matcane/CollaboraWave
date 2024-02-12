from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(username=username, password=password)
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return Response({'message': 'Login successful'})
            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Both username and password are required'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_logout(request):
    if request.method == 'POST':
        logout(request)
        return Response({'message': 'Logout successful'})
    else:
        return Response({'error': 'Only POST method allowed'}, status=status.HTTP_400_BAD_REQUEST)
