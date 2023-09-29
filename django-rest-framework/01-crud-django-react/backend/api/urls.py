from django.urls import path
from . import views

urlpatterns = [
  path('get/', views.get_blogs),
  path('get-one/<int:pk>/', views.get_blog),
  path('post/', views.post_blog),
  path('put/<int:pk>/', views.put_blog),
  path('delete/<int:pk>/', views.delete_blog),
]
