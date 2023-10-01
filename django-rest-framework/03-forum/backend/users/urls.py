from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('update-user/', views.update_user),
    path('upload-image/', views.upload_image),
    path('user-profile/', views.get_user_profile),
    path('user-info/<int:pk>/', views.get_user),
    path('users-list/', views.get_users),
]
