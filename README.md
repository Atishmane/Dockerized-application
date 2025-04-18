# Dockerized Web Scraper and Content Host
This project demonstrates a full-stack DevOps solution that scrapes data from a given URL using Node.js and Puppeteer, then serves that content through a Python Flask application — all containerized using Docker with a multi-stage build.

## Features
- Headless web scraping using Puppeteer
- Dynamic URL input via environment variable (SCRAPE_URL)
- JSON output with page title, first heading, and description 
- Flask web server displaying the data as:
  - /api → JSON API
  - / → Styled HTML interface
- Multi-stage Docker build for minimal image size

## How to Use
1. Clone the Repository

git clone https://github.com/Atishmane/Dockerized-application

cd Dockerized-application

3. Build the Docker Image
docker build -t web-scraper-app .

4. Run the Container
Replace the URL with any valid website you want to scrape:
docker run -e SCRAPE_URL="https://example.com" -p 5000:5000 web-scraper-app

## Access the Output

Web UI (HTML View): http://localhost:5000

JSON API: http://localhost:5000/api



