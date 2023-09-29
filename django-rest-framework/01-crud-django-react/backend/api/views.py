from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Blog
from .serializers import BlogSerializer

# Creamos un método GET de API
@api_view(['GET'])
def get_blogs(request):
    blog = Blog.objects.all()
    serializer = BlogSerializer(blog, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog, many=False)

    return Response(serializer.data)

@api_view(['POST'])
def post_blog(request):
    data = request.data
    blog = Blog.objects.create(
        body=data['body'],
    )
    serializer = BlogSerializer(blog, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
def put_blog(request, pk):
    data = request.data
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    blog.delete()

    return Response('Blog was deleted!')
