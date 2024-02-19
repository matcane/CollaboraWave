from django.db import models
from django.contrib.auth.models import User


class Board(models.Model):
    title = models.CharField(max_length=40)
    owner = models.ForeignKey(User, related_name='boards', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.title}"


class Stage(models.Model):
    title = models.CharField(max_length=40)
    board = models.ForeignKey(Board, related_name="stages", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title}"


class Card(models.Model):
    title = models.CharField(max_length=40)
    stage = models.ForeignKey(Stage, related_name="cards", on_delete=models.CASCADE)
    due_date = models.DateTimeField(blank=True, null=True)
    description = models.TextField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.title}"
