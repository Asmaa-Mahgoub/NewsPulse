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
•	Password management (change).  


**📄 Pages Implemented**
•	HomePage  
•	CategoryPage  
•	SearchResultPage  
•	UserInfoPage  
•	AdminPage  
**⚡ Features Implemented**
•	Pagination for articles.  
•	Search bar for querying articles.  
•	Category-based filtering.  
•	Admin capabilities: Add & Edit articles.  
•	Responsive Admin Dashboard.  

## Back-End Contribution
The backend was developed using Django + Django REST Framework (DRF).  
### 🔹 Features  
•	REST API for frontend integration.  
•	Token-based authentication (login/logout).  
•	Custom user model with roles (Author / Admin).  
•	CRUD for articles with ownership restrictions.  
•	Search and filter for articles.  
•	Profile management.  
•	Password change support.  

## ⚙️ Installation
🔹 Backend (Django)  
## Clone repo
git clone https://github.com/Asmaa-Mahgoub/NewsPulse.git  
cd NewsPulse  

## Create virtual environment
python -m venv venv  
source venv/Scripts/activate  # (Windows)  
source venv/bin/activate      # (Linux/Mac)  

## Install dependencies
pip install -r requirements.txt  

## Run migrations
python manage.py migrate  

## Create superuser
python manage.py createsuperuser  

## Start server
python manage.py runserver  
•	Access at:
o	Local: http://127.0.0.1:8000  
o	Deployed: https://newspulse-re0c.onrender.com  

## ▶ Usage
### News Module
•	Get all news: GET /api/news/  
•	Search: GET /api/news/?q=apple  
•	Filter by category: GET /api/news/?category=technology  
•	Pagination: GET /api/news/?page=2  
### Articles Module
•	Login: POST /api/auth/login/  
•	Logout: POST /api/auth/logout/  
•	Create/List Articles: POST /api/auth/articles/  
•	Retrieve/Update/Delete Article: GET/PUT/DELETE /api/auth/articles/<id>/  
•	Profile View/Update: /api/profile/view/, /api/profile/update/  
•	Change Password: POST /api/auth/password-change/    

## 🔐 Authentication & Permissions
•	Token-based authentication: Authorization: Token <user-token>.  
## 	Roles:
o	**Author →** manage only their own articles.  
o	**Admin →** full access to all users & articles.  
o	**Guests (unauthenticated) →** read-only access.  

# 🧰 Tech Stack
## Backend
•	Python, Django, DRF  
•	Django Filters  
•	NewsAPI  
•	SQLite  
•	JWT / Token Auth    

## 🔗 Links
•	Frontend Live Demo: https://news-pulse-alx.netlify.app/  
•	Backend Live Demo: https://newspulse-re0c.onrender.com  
•	Project Repo: https://github.com/Asmaa-Mahgoub/NewsPulse  

## 👥 Contribution
•	Backend Development: [Asmaa Mahgoub]  

