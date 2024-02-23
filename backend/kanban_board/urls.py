from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),

    path('board_list/', views.board_list, name='board_list'),
    path('board/<int:id>/', views.board_detail, name='board_detail'),
    path('board_create/', views.board_create, name='board_create'),
    path('board_update/<int:id>/', views.board_update, name='board_update'),
    path('board_delete/<int:id>/', views.board_delete, name='board_delete'),

    path('board/<int:board_id>/stages/', views.stage_list, name='stages_list'),
    path('board/<int:board_id>/stage_detail/<int:stage_id>/', views.stage_detail, name='stages_detail'),
    path('board/<int:board_id>/stage_create/', views.stage_create, name='stages_create'),
    path('board/<int:board_id>/stage_update/<int:stage_id>/', views.stage_update, name='stages_update'),
    path('board/<int:board_id>/stage_delete/<int:stage_id>/', views.stage_delete, name='stages_delete'),

    path('board/<int:board_id>/stage_detail/<int:stage_id>/cards/', views.card_list, name='cards_list'),
    path('board/<int:board_id>/stage_detail/<int:stage_id>/card_detail/<int:card_id>/', views.card_detail, name='cards_detail'),
    path('board/<int:board_id>/stage_detail/<int:stage_id>/card_create/', views.card_create, name='cards_crate'),
    path('board/<int:board_id>/stage_detail/<int:stage_id>/card_update/<int:card_id>/', views.card_update, name='cards_update'),
    path('board/<int:board_id>/stage_detail/<int:stage_id>/card_delete/<int:card_id>/', views.card_delete, name='cards_delete'),

]