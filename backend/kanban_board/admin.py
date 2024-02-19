from django.contrib import admin

from .models import Board, Stage, Card


@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'owner', 'created', 'description']
    list_filter = ('title', 'owner', 'created')


@admin.register(Stage)
class StageAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'board']
    list_filter = ('title', 'board')


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'stage', 'due_date', 'description']
    list_filter = ('title', 'stage', 'due_date')
