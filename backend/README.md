# Internal Enterprise CRM Platform

## Overview

This project is a unified CRM platform built for managing multiple SaaS products from a single web application.

Supported Products:

- EduPulse
- CloudMetric

---

## Tech Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- Swagger UI

---

## Features

### EduPulse

- Subscription Plans (CRUD)
- Message Templates (CRUD)

### CloudMetric

- Client Sites (CRUD)

### Security

- JWT Authentication
- HTTP Bearer Token
- Product-based access using JWT claims

---

## Installation

### Clone

```bash
git clone <repository>
```

### Install

```bash
pip install -r requirements.txt
```

### Configure Environment

Copy:

```
.env.example
```

to

```
.env
```

Update PostgreSQL credentials.

### Run

```bash
uvicorn app.main:app --reload
```

---

## Swagger

```
http://127.0.0.1:8000/docs
```

---

## Generate Test Token

```bash
python generate_test_token.py
```

Copy the generated JWT and use the **Authorize** button in Swagger.

---

## API Endpoints

### Subscription Plans

- GET /api/v1/plans
- POST /api/v1/plans
- PUT /api/v1/plans/{id}
- DELETE /api/v1/plans/{id}

### Message Templates

- GET /api/v1/templates
- POST /api/v1/templates
- PUT /api/v1/templates/{id}
- DELETE /api/v1/templates/{id}

### Client Sites

- GET /api/v1/sites
- POST /api/v1/sites
- PUT /api/v1/sites/{id}
- DELETE /api/v1/sites/{id}

---

## Authentication

All APIs require a JWT Bearer Token.

Generate a test token using:

```bash
python generate_test_token.py
```

Then authorize in Swagger.

---

## Project Structure

```
backend/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database.py
│   └── main.py
│
├── generate_test_token.py
├── schema.sql
├── requirements.txt
├── .env.example
└── README.md
``` 