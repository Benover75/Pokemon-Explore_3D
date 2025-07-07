# Pokémon Explorer Docker Commands
.PHONY: build up down logs clean restart shell health

# Variables
IMAGE_NAME = pokemon-explorer
CONTAINER_NAME = pokemon-explorer-app
PORT = 8080

# Build the Docker image
build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .
	@echo "✅ Image built successfully!"

# Start the application
up:
	@echo "Starting Pokémon Explorer..."
	docker-compose up -d
	@echo "✅ Application started at http://localhost:$(PORT)"

# Stop the application
down:
	@echo "Stopping Pokémon Explorer..."
	docker-compose down
	@echo "✅ Application stopped"

# View logs
logs:
	@echo "Showing application logs..."
	docker-compose logs -f pokemon-explorer

# Clean up everything
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v --remove-orphans
	docker system prune -f
	docker volume prune -f
	@echo "✅ Cleanup completed"

# Restart the application
restart: down up

# Get a shell inside the container
shell:
	@echo "Opening shell in container..."
	docker exec -it $(CONTAINER_NAME) /bin/sh

# Check application health
health:
	@echo "Checking application health..."
	curl -f http://localhost:$(PORT)/health && echo "✅ Application is healthy!" || echo "❌ Application is unhealthy!"

# Build and run in one command
dev: build up
	@echo "🚀 Development environment ready!"

# Production deployment with Traefik
prod:
	@echo "Starting production environment..."
	docker-compose --profile production up -d
	@echo "✅ Production environment started!"
	@echo "📊 Traefik dashboard: http://localhost:8088"
	@echo "🌐 Application: http://pokemon.localhost"

# Show running containers
status:
	@echo "Container status:"
	docker ps --filter name=$(CONTAINER_NAME)

# Show container stats
stats:
	@echo "Container statistics:"
	docker stats --no-stream $(CONTAINER_NAME)

# Backup application data (if any)
backup:
	@echo "Creating backup..."
	mkdir -p backups
	docker run --rm -v pokemon-explorer_logs:/data -v $(PWD)/backups:/backup alpine tar czf /backup/pokemon-logs-$(shell date +%Y%m%d_%H%M%S).tar.gz -C /data .
	@echo "✅ Backup created in ./backups/"

# Help command
help:
	@echo "Pokémon Explorer Docker Commands:"
	@echo ""
	@echo "  build    - Build the Docker image"
	@echo "  up       - Start the application"
	@echo "  down     - Stop the application"
	@echo "  logs     - View application logs"
	@echo "  clean    - Clean up all Docker resources"
	@echo "  restart  - Restart the application"
	@echo "  shell    - Open shell in container"
	@echo "  health   - Check application health"
	@echo "  dev      - Build and start (development)"
	@echo "  prod     - Start production environment"
	@echo "  status   - Show container status"
	@echo "  stats    - Show container statistics"
	@echo "  backup   - Backup application data"
	@echo "  help     - Show this help messa