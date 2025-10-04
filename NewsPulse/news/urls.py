from django.urls import path
from .views import NewsView, CategoryView

urlpatterns=[
    path('news/', NewsView.as_view(), name='news_view'),
    path('category/', CategoryView.as_view(), name='category_view'),
]

