from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.authentication import JWTStatelessUserAuthentication, JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
JWT_authenticator = JWTAuthentication()


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
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        logout(request)
        return Response({'message': 'Logout successful'})
    else:
        return Response({'error': 'Only POST method allowed'}, status=status.HTTP_400_BAD_REQUEST)


def get_user_from_jwt(token):
    # test = Token.
    # user_id = decoded_token['user_id']
    # user = User.objects.get(id=user_id)
    return token


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user
    return Response({"user": user.id})
