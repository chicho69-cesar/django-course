from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_blogs),
    path('get/<int:pk>/', views.get_blog),
    path('create/', views.create_blog),
    path('update/<int:pk>/', views.update_blog),
    path('delete/<int:pk>/', views.delete_blog),
    path('comment/<int:pk>/', views.add_comment),
]
