.PHONY: help build up down test lint migrate evaluate-mock validate-library

help:
	@echo "Policy-as-Code Library - Management Commands"
	@echo "-------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Policy)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "evaluate-mock      : Evaluate a mock resource against policies"
	@echo "validate-library   : Validate the integrity of all policy files"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/policies
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker apps/policy-engine
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

evaluate-mock:
	docker-compose exec api python scripts/evaluate/mock_resource.py --resource-type "S3"

validate-library:
	docker-compose exec api python scripts/validate/policy_lint.py
