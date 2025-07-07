# Use official lightweight nginx image
FROM nginx:alpine

# Install curl for healthchecks (small footprint with apk)
RUN apk add --no-cache curl

# Set working directory to nginx html folder
WORKDIR /usr/share/nginx/html

# Clean default static files
RUN rm -rf ./*

# Copy your static site assets (index.html, css, js, images)
COPY index.html .

# Copy custom nginx config that listens on port 8000
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port your nginx server listens on
EXPOSE 8000

# Define healthcheck to monitor container health (using curl)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

# Run nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
