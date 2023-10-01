from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import BlogSerializer
from .models import Blog, Comment
from users.models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_blogs(request):
    blogs = Blog.objects.filter().order_by('-date')
    blog_serializer = BlogSerializer(blogs, many=True)

    return Response(blog_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    blog_serializer = BlogSerializer(blog, many=False)

    return Response(blog_serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    data = request.data
    blog = Blog.objects.create(
        user=request.user,
        body=data['body']
    )

    blog_serializer = BlogSerializer(blog, many=False)

    return Response(blog_serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    data = request.data
    blog = Blog.objects.get(id=pk)
    blog_serializer = BlogSerializer(blog, data=data)

    if blog.user == request.user:
        if blog_serializer.is_valid():
            blog_serializer.save()
    else:
        return Response(
            {'error': 'You do not have permission to edit this blog'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    return Response(blog_serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    blog = Blog.objects.get(id=pk)

    if blog.user == request.user:
        blog.delete()
        return Response('Blog was deleted')
    else:
        return Response(
            {'error': 'You do not have permission to delete this blog'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, pk):
    blog = Blog.objects.get(id=pk)
    user = request.user
    data = request.data

    Comment.objects.create(
        user=user,
        blog=blog,
        text=data['text']
    )

    blog.comment_set.all() # type: ignore
    blog.save()

    return Response('Comment was added')
