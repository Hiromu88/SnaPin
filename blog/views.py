from datetime import time
from django.http import response
from django.shortcuts import redirect, render, get_object_or_404
from django.utils import timezone
from .models import Post
from .forms import PostForm
# スクレイピング用
from bs4 import BeautifulSoup
import requests
import pandas as pd
from django.views.generic import CreateView
from django.urls import reverse_lazy
from .models import Scraping
import json
#Google maps api用
from django import template
from django.http import HttpResponse
from django.template import context, loader

def post_list(request):
    # posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    # 降順に並べる
    posts = Post.objects.all().order_by('-published_date')
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})


def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            # 画像用に記述
            post.image = request.FILES['image']
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            # return redirect('post_detail', pk=post.pk)
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form' : form})
    # return render(request, 'blog/post_list.html', {'form' : form})


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_edit.html', {'form': form})

# 投稿削除用
def post_remove(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect('post_list')

# Googlemapsapi表示用
def index(request):
    template = loader.get_template('list.html')
    context = {}
    return HttpResponse(template.render(context, request))

# # 以下スクレイピング用

# class Create(CreateView):
#     template_name = 'scraping_input.html'
#     model = Scraping
#     fields = ('url',)
#     success_url = reverse_lazy('list')

# def listfunc(request):
#     for post in Scraping.objects.all():
#         url = post.url
#     list = []
#     response = requests.get(url)
#     bs = BeautifulSoup(response.text, "html.parser")
#     ul_tag = bs.find_all( class_='sc-esjQYD hOkRCB')
#     for tag in ul_tag:
#         title = tag.a.getText()
#         url2 = tag.a.get('href')
#         list.append([title, url2])
#     context = {'list': list,}
#     return render(request, 'list.html', context)


class Create(CreateView):
    template_name = 'scraping_input.html'
    model = Scraping
    fields = ('url',)
    # success_url = reverse_lazy('scraping_output')
    success_url = reverse_lazy('list')

def Scrapingfunc(request):
    for post in Scraping.objects.all():
        url = post.url
    #変数d_listに空のリストを作成
    d_list = []
    #対象サイトのURLをPostFormから取得
    response = requests.get(url)
    # 取得結果を解析してsoupに格納
    soup = BeautifulSoup(response.text, "html.parser")
    # すべてのカフェ情報を取得
    contents = soup.find_all('div', class_='Post-section')

    def matched2(x):
        a = x.find('a', class_= 'Post-spot--affiliate--logo Post-spot--affiliate--others--btn')
        return  a != None

    contents_list =  list(filter(matched2, contents))
    def matched3(x):
        return  'hotpepper.jp' in  x['href']

    # 各カフェ情報をforループで取得
    for content in contents_list:
        url_a = content.find_all('a', class_= 'Post-spot--affiliate--logo Post-spot--affiliate--others--btn')
        matched_list1 = list(filter(matched3, url_a))
        hotpepper_url = ""
        if len(matched_list1) != 0:
            hotpepper_url = matched_list1[0]['href']

        # 変数名nameに、店舗名を格納
        name = content.find('div', class_='Post-spot--info-title').text
        # 変数名addressに、住所を格納
        address_before = content.find('div', class_='Post-spot--info-content--meta-txt').text

        # #変数dに、これまで取得した5項目を格納
        d = {
            "name": name,
            "address": address_before,
            "url": hotpepper_url,
            #hotpepperのAPI用
            # "key" : '91987b32791e2b64',
            "key" : 'MY API KEY',
            "format": 'json',
        }
        #取得した辞書をd_listに格納
        d_list.append(d)

    # ここまでOK

    # hotpepperのapi
    url_api =  'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
    #api結果とマージしたものをいれるリストを定義
    final_list = []

    for content2 in (d_list):
        if content2['url'] != "":
        # if content2['url'] == "":
        #     add_list = {
        #         "name" : content2['name'],
        #         "address" : content2['address'],
        #         "url" : '',
        #         "lat" : '',
        #         "lng" : '',
        #         "id" : '',
        #         "image":'',
        #         "wifi":'',
        #         "open":'',
        #     }
        #     final_list.append(add_list)
        # else:
            pre_id = content2['url'][28:]
            id = pre_id[:-1]
            params = {}
            params ['key'] = content2['key']
            params ['format'] = content2['format']
            params['id'] = id

            response = requests.get(url_api, params)
            test = response.json()
            if len(test['results']['shop']) == 0:
                        add_list = {
                            "name" : content2['name'],
                            "address" : content2['address'],
                            "url": content2['url'],
                            "lat" : '',
                            "lng" : '',
                            "id" : '',
                            "image":'',
                            "wifi":'',
                            "open":'',
                        }
                        final_list.append(add_list)

            else:

                a = test['results']['shop']
                # 店舗名の追加
                add_list_name = content2['name']
                # 店舗の住所
                add_list_address =a[0]['address']
                # 店舗情報のurl取得
                add_list_url_shop = a[0]['urls']['pc']
                # 店舗の緯度取得
                add_list_lat = a[0]['lat']
                # 店舗の経度取得
                add_list_lng = a[0]['lng']
                #お店の写真取得
                add_list_image = a[0]['photo']['pc']['l']
                #営業時間の取得
                add_list_open = a[0]['open']
                #Wi-Fi情報の取得
                add_list_wifi = a[0]['wifi']

                add_list = {
                    "name" : add_list_name,
                    "address" : add_list_address,
                    "url" : add_list_url_shop,
                    "lat" : add_list_lat,
                    "lng" : add_list_lng,
                    "id" : id,
                    "image" : add_list_image,
                    "open": add_list_open,
                    "wifi": add_list_wifi,
                }
                final_list.append(add_list)

                result = list(filter(lambda x: x["lat"] != "", final_list))

                # テンプレートに渡すデータを格納
    context = {'final_list' : result,}
    # print(final_list)
    return render(request, 'list.html', context)
    # return render(request, 'list.html', {'final_list' : result})
    # return render(request, 'list.html', {'final_list_json' : json.dumps(final_list)})

