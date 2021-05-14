from typing import Text
from django.conf import settings
from django.db import models
from django.utils import timezone
from taggit.managers import TaggableManager


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    # スクレイピング用URLの格納場所
    url = models.URLField()
    #画像用
    image = models.ImageField(upload_to='images', blank=True, null=True)
    # image = models.ImageField(upload_to='staticfiles/images', blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

    #内容を要約して表示させる
    def summary(self):
        return self.text[:40]

class Scraping(models.Model):
    url = models.CharField(max_length=100)