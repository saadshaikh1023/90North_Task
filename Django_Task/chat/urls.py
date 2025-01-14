from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat_view, name='chat'),
    path('register/', views.register, name='register'),
    path('messages/<int:user_id>/', views.get_messages, name='get_messages'),
]