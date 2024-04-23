# CollaboraWave: Project management application
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)

## Description
CollaboraWave is a project management application based on the Kanban concept. With it, you can easily create, edit, and delete boards, stages on the board, and cards within stages to efficiently manage your tasks and projects. The project consists of a backend written in Python using the Django framework and Django REST Framework, and a frontend written in JavaScript using the React library. JWT (JSON Web Token) is used for user authentication.

## Features
- User registration and login
- Creation, editing, and deletion of boards
- Adding, editing and deleting stages in boards
- Adding, editing and deleting cards in stages
- Use of JWT for user authentication and authorization

## Installation and Running
1. Clone the repository: `git clone https://github.com/matcane/CollaboraWave.git`
2. Create a Python environment `python3 -m venv env`
3. Activate the Python environment `source env/bin/activate`
4. Navigate to the backend directory: `cd backend`
5. Install the required Python libraries: `pip install -r requirements.txt`
6. Generate `.env` file and set up database: `python getEnv.py`
7. Run migration: `python manage.py migrate`
8. Run the backend server: `python manage.py runserver`
9. Navigate to the frontend directory: `cd frontend`
10. Install the required JavaScript libraries: `npm install`
11. Start the frontend development server: `npm start`
12. The application will be available at: `http://localhost:5173/`

## RoadMap
- Forms validation
- Alerts
- Templates for Boards
- Shared Boards
- ...

## Demo

[![CollaboraWave Demo](http://img.youtube.com/vi/Jwf3pSAsAao/0.jpg)](http://www.youtube.com/watch?v=Jwf3pSAsAao "CollaboraWave Demo")