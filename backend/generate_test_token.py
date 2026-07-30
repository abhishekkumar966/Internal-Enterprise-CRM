from app.core.security import create_access_token

payload = {
    "employee_id": 101,
    "name": "Abhishek Kumar",
    "role": "admin",
    "products": [
        "EduPulse",
        "CloudMetric"
    ]
}

token = create_access_token(payload)

print("\nGenerated Token:\n")
print(token)