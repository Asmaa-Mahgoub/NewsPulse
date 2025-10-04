NewsPulse – Full-Stack News Aggregation & Articles Management Platform
Project Description
NewsPulse is a full-stack news platform built with Django REST Framework (backend) and React.js (frontend):
1.	News API Integration: Fetches and displays latest news from external APIs, supports keyword search, category filtering, and pagination.
2.	Articles Management: Allows authors/journalists to register, log in, manage their own articles (CRUD), view/edit their profiles, and securely change passwords. Admins have full control over all users and articles.
The system exposes RESTful API endpoints (Django) and integrates with a React-based frontend for a responsive and engaging user experience.________________________________________
Table of Contents
•	Features
•	Front-End Contribution
•	Back-End Contribution
•	Installation
•	Usage
•	API Endpoints
•	Authentication & Permissions
•	Technologies
•	Screenshots
•	Links
________________________________________
Features
News Module
•	Fetch latest news articles from external sources.
•	Keyword-based search and category-based filtering (general, business, entertainment, health, science, sports, technology).
•	Pagination support for API results.
•	Structured JSON response for frontend consumption.
Articles Module
•	User Roles:
o	Author → Create, update, delete, and view their own articles.
o	Admin → Manage all articles and users.
•	Functionalities:
o	CRUD operations for articles.
o	Upload media files (images/videos).
o	Profile management (view/update).
•	Password management (change).
________________________________________
Front-End Role
As the Front-End Developer, I was responsible for:
•	Building the complete UI for all pages.
•	Connecting the frontend with the Django REST API using Axios.
•	Implementing Routing with React Router.
•	Managing API state & caching using TanStack Query.
•	Developing forms with React Hook Form (with validation).
•	Ensuring a responsive, user-friendly design with Tailwind CSS.
📄 Pages Implemented
•	HomePage
•	CategoryPage
•	SearchResultPage
•	UserInfoPage
•	AdminPage
⚡ Features Implemented
•	Pagination for articles.
•	Search bar for querying articles.
•	Category-based filtering.
•	Admin capabilities: Add & Edit articles.
•	Responsive Admin Dashboard.
🛠️ Challenges Faced
•	First-time connecting a React Frontend with a Django API.
•	Handling Admin route protection.
•	Responsive Admin Dashboard implementation.
•	Learning TanStack Query for data caching.
•	Ensuring proper form validation.

Back-End Contribution
The backend was developed using Django + Django REST Framework (DRF).
🔹 Features
•	REST API for frontend integration.
•	Token-based authentication (login/logout).
•	Custom user model with roles (Author / Admin).
•	CRUD for articles with ownership restrictions.
•	Search and filter for articles.
•	Profile management.
•	Password change support.
________________________________________
⚙️ Installation
🔹 Backend (Django)
# Clone repo
git clone https://github.com/Asmaa-Mahgoub/NewsPulse.git
cd NewsPulse

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # (Windows)
source venv/bin/activate      # (Linux/Mac)

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
•	Access at:
o	Local: http://127.0.0.1:8000
o	Deployed: https://newspulse-re0c.onrender.com
🔹 Frontend (React)
# Clone repo
git clone https://github.com/ m7medA/news-pulse.git
cd news-pulse

# Install dependencies
npm install

# Start development server
npm run dev
•	Access at:
o	Local: http://localhost:5173
o	Deployed: https://news-pulse.vercel.app
________________________________________
▶ Usage
News Module
•	Get all news: GET /api/news/
•	Search: GET /api/news/?q=apple
•	Filter by category: GET /api/news/?category=technology
•	Pagination: GET /api/news/?page=2
Articles Module
•	Login: POST /api/auth/login/
•	Logout: POST /api/auth/logout/
•	Create/List Articles: POST /api/auth/articles/
•	Retrieve/Update/Delete Article: GET/PUT/DELETE /api/auth/articles/<id>/
•	Profile View/Update: /api/profile/view/, /api/profile/update/
•	Change Password: POST /api/auth/password-change/
________________________________________
🔐 Authentication & Permissions
•	Token-based authentication: Authorization: Token <user-token>.
•	Roles:
o	Author → manage only their own articles.
o	Admin → full access to all users & articles.
•	Guests (unauthenticated) → read-only access.
________________________________________
🧰 Tech Stack
Frontend
•	React
•	React Router
•	TanStack Query
•	Axios
•	React Hook Form
•	React Icons
•	Tailwind CSS
Backend
•	Python, Django, DRF
•	Django Filters
•	NewsAPI
•	SQLite
•	JWT / Token Auth
________________________________________
📸 Screenshots
•	🏠 Homepage
•	📂 Category Page
•	🔎 Search Results
•	👤 User Profile
•	🛠️ Admin Dashboard
________________________________________
🔗 Links
•	Frontend Live Demo: https://news-pulse.vercel.app
•	Backend Live Demo: https://newspulse-re0c.onrender.com
•	Project Repo: https://github.com/Asmaa-Mahgoub/NewsPulse
________________________________________
👥 Contribution
•	Frontend Development: [Mohamed Ayman]
•	Backend Development: [Asmaa Mahgoub]

