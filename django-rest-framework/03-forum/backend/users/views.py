from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user_serializers = UserSerializerWithToken(self.user).data

        for token, user in user_serializers.items():
            data[token] = user

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    data = request.data

    try:
        user = User.objects.create(
            user_name=data['user_name'],
            email=data['email'],
            password=make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)
    except:
        message = {'detail': 'Error registering the user!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    user_serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.user_name = data['user_name']
    user.bio = data['bio']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(user_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    user_id = request.user.id
    user = User.objects.get(id=user_id)
    user.image = request.FILES.get('image')
    user.save()

    return Response('Image was uploaded')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    user_serializer = UserSerializer(user, many=False)
    return Response(user_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):
    user = User.objects.get(id=pk)
    user_serializer = UserSerializer(user, many=False)
    return Response(user_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    users_serializer = UserSerializer(users, many=True)
    return Response(users_serializer.data)
