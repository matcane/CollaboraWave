from django.db import models
from django.contrib.auth.models import User


class Board(models.Model):
    title = models.CharField(max_length=40)
    owner = models.ForeignKey(User, related_name='boards', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.title}"
