from django.urls import path
from . import views
# スクレイピング用
from .views import Create, Scrapingfunc

urlpatterns = [
    path('post_list', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/new/', views.post_new, name='post_new'),
    path('post/<int:pk>/edit/', views.post_edit, name='post_edit'),
    # スクレイピングの記述
    path('', Create.as_view(), name='scraping_input'),
    path('scraping_output/', Scrapingfunc, name='scraping_output'),
    #Googlemap表示記述
    # path('list/',views.index, name='list'),
    path('list/',Scrapingfunc, name='list'),
    # リストの削除用
    path('post/<pk>/remove/', views.post_remove, name='post_remove'),
]

