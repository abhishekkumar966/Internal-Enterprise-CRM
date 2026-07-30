CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    plan_name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    billing_cycle VARCHAR(100),
    features JSONB
);

CREATE TABLE message_templates (
    id SERIAL PRIMARY KEY,
    template_name VARCHAR(255) NOT NULL,
    delivery_channel VARCHAR(100),
    message_configuration JSONB
);

CREATE TABLE client_sites (
    id SERIAL PRIMARY KEY,
    domain_name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    status VARCHAR(100),
    daily_request_quota INTEGER
);