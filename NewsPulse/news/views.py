from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
# Create your views here.

class NewsView(APIView):
    def get(self, request):
        # category and general are built in filters in the NewsAPI where general is the default if nothing is specified.
        #category =request.GET.get("category","general")
        # q is a keyword search (optional)
        query = request.GET.get("q", "")  
        category= request.GET.get('category', 'general')
        page = int(request.GET.get('page', 1))  # Get current page, default is 1
        per_page = 4  # Number of articles per page


        if category:
            # simulate category by adding it to query
            query = f"{query} {category}".strip()

        # Build API URL (BBC + CNN + category filter)
        url= (f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&apiKey=e3ce85da57194f3cb0110c7218ca8052")   #remove sources=bbc-news,cnn from url as it returns bad response
        response= requests.get(url)

        if response.status_code == 200:
            data= response.json()
            articles=[]
            for article in data['articles']:
                items={
                    'title': article.get('title'),
                    'description': article.get('description'),
                    'url': article.get('url'),
                    'image': article.get('urlToImage'),
                    'publishedAt': article.get('publishedAt'),
                    'source': article['source']['name']
                    }
            
                articles.append(items)
            
            total_articles = len(articles)
            start = (page - 1) * per_page
            end = start + per_page
            paginated_articles = articles[start:end]

            return Response({
                "page": page,
                "per_page": per_page,
                "total_articles": total_articles,
                "total_pages": (total_articles + per_page - 1) // per_page,
                "articles": paginated_articles
            })
        else:
            #print(f"Error fetching data: {response.status_code}") removed bec error is printed only on the backend server’s terminal.The frontend user sees nothing, only you (developer) see it.
            return Response(
                {"error": f"Error fetching data: {response.status_code}"},
                status=response.status_code,
            )        
            # return Response =>Sends an HTTP response back to the frontend to display the error message in the UI.


class CategoryView(APIView):
    def get(self, request):
        
        categories = [
            "general"
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
        ]
        return Response({"categories": categories})

    
""" requests.get is from the Python requests library. It sends an HTTP GET request to an external API.
for example if url is the base URL of the API (https://newsdata.io/api/1/news).
params=params automatically converts the dictionary into URL query parameters.
params = {"apikey": "MY_KEY", "q": "apple", "category": "technology", "language": "en"}
This becomes a GET request to:
https://newsdata.io/api/1/news?apikey=MY_KEY&q=apple&category=technology&language=en """
