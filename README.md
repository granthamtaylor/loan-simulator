# Gamified Credit Risk Management Web App

## Intent

This is a gamified CRM app. Anyone can register/login and view real loan applications and begin approving them. The approved loans become part of the user's fantasy portfolio. The user may view a dashboard of their portfolio to monitor their assets. Additionally, the user may view and compare the performance of other users and machine learning models to that of their own.

## Roadmap
- Machine Learning
  - Modeling Dashboard
    - Compare performance with models
    - Explain / interpret models
    - Simulate models with user's reviews
  - Optimize Logistic Regression
  - Train XGB
  - Train ANN
- User Interface
  - Match Boulevard Colors
  - Create responsive navigation
  - Reformat Splash Page
  - Modularize Repeated Components
- User Dashboard
  - Line for cumulative portfolio value over time
  - Flow chart of approved loans
  - Distribution of loan outcomes (Treemap?)
- Leaderboard
  - Drill down into any user's own dashboard from leaderboard (with search functionality?)



## Technology

This is a containerized web app built with DRP (Django, React, & Postgres)
1. Postgres is managed and queried by Django. 
2. Django converts psql queries into API calls. 
3. React makes API calls to Django's RESTful Framework.

**Tailwind**, a "utility-first" CSS Framework, makes everything look fantastic with ease.

**Nivo** is integrated for easy visualizations.

The data was sourced from the **Lending Club Dataset** available on *Kaggle*.

## User Guide

### Launching
1. Clone.
2. Install docker.
3. `docker-compose up` from the project root.
4. That's it. Huzzah.

### Available Ports
1. Django REST Framework API Root is available at `localhost:8000/api`
1. React App is available at `localhost:3000`

## Development Notes

### How to add modules to Node/React:
This setup requires npm to add modules from within the container itself as such:
1. `docker exec -it react npm add {module-name}`
2. Restart `react` container
