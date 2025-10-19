# NewsPulse – News Aggregation & Articles Management Platform

## Project Description
NewsPulse is a news platform built with Django REST Framework (backend):  
1.	**News API Integration**: Fetches and displays latest news from external APIs, supports keyword search, category filtering, and pagination.  
2.	**Articles Management**: Allows authors/journalists to register, log in, manage their own articles (CRUD), view/edit their profiles, and securely change passwords. Admins have full control over all users and articles.  
   
The system exposes RESTful API endpoints (Django) and integrates with a React-based frontend for a responsive and engaging user experience.  

## Features:
### News Module:
•	Fetch latest news articles from external sources.  
•	Keyword-based search and category-based filtering (general, business, entertainment, health, science, sports, technology).  
•	Pagination support for API results.  
•	Structured JSON response for frontend consumption.  

### Articles Module:
**User Roles:**  
o	**Author →** Create, update, delete, and view their own articles.  
o	**Admin →** Manage all articles and users.  

**Functionalities:**  
o	CRUD operations for articles.  
o	Upload media files (images/videos).  
o	Profile management (view/update).  
o	Password management (change).  


**📄 Pages Implemented**  
o	HomePage  
o	CategoryPage  
o	SearchResultPage  
o	UserInfoPage  
o	AdminPage 

**⚡ Features Implemented**  
o	Pagination for articles.  
o	Search bar for querying articles.  
o	Category-based filtering.  
o	Admin capabilities: Add & Edit articles.  
o	Responsive Admin Dashboard.  

## Back-End Contribution
The backend was developed using Django + Django REST Framework (DRF).  
### 🔹 Features  
o	REST API for frontend integration.  
o	Token-based authentication (login/logout).  
o	Custom user model with roles (Author / Admin).  
o	CRUD for articles with ownership restrictions.  
o	Search and filter for articles.  
o	Profile management.  
o	Password change support.  

## ⚙️ Installation
🔹 Backend (Django)  
**Clone repo**  
git clone https://github.com/Asmaa-Mahgoub/NewsPulse.git  
cd NewsPulse  

**Create virtual environment**  
python -m venv venv  
source venv/Scripts/activate  # (Windows)  
source venv/bin/activate      # (Linux/Mac)  

**Install dependencies**  
pip install -r requirements.txt  

**Run migrations**  
python manage.py migrate  

**Create superuser**  
python manage.py createsuperuser  

**Start server**  
python manage.py runserver  
•	Access at:
o	Local: http://127.0.0.1:8000  
o	Deployed: https://newspulse-re0c.onrender.com  

**▶ Usage**  

**News Module**  
o	Get all news: GET /api/news/  
o	Search: GET /api/news/?q=apple  
o	Filter by category: GET /api/news/?category=technology  
o	Pagination: GET /api/news/?page=2 

**Articles Module**  
o	Login: POST /api/auth/login/  
o	Logout: POST /api/auth/logout/  
o	Create/List Articles: POST /api/auth/articles/  
o	Retrieve/Update/Delete Article: GET/PUT/DELETE /api/auth/articles/<id>/  
o	Profile View/Update: /api/profile/view/, /api/profile/update/  
o	Change Password: POST /api/auth/password-change/    

**🔐 Authentication & Permissions**    
o	Token-based authentication: Authorization: Token <user-token>.

**Roles:**    
o	**Author →** manage only their own articles.  
o	**Admin →** full access to all users & articles.  
o	**Guests (unauthenticated) →** read-only access.  

## 🧰 Tech Stack
**Backend**  
o	Python, Django, DRF  
o	Django Filters  
o	NewsAPI  
o	SQLite  
o	JWT / Token Auth    

**🔗 Links**  
o	Frontend Live Demo: https://news-pulse-alx.netlify.app/  
o	Backend Live Demo: https://newspulse-re0c.onrender.com  
o	Project Repo: https://github.com/Asmaa-Mahgoub/NewsPulse  

**👥 Contribution**    
o	Backend Development: [Asmaa Mahgoub]  

