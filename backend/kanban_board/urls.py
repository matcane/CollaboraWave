from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),

    path('board_list/', views.board_list, name='board_list'),
    path('board/<int:id>/', views.board_detail, name='board_detail'),
    path('board_create/', views.board_create, name='board_create'),
    path('board_delete/<int:id>', views.board_delete, name='board_delete'),
]