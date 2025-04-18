FROM node:18-slim AS scraper
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app
RUN apt-get update && \
    apt-get install -y chromium fonts-liberation && \
    rm -rf /var/lib/apt/lists/*
COPY node_scraper/package.json .
RUN npm install
COPY node_scraper/scrape.js .
ENV SCRAPE_URL=https://example.com
RUN mkdir /scraped_data
RUN node scrape.js
FROM python:3.10-slim AS server
WORKDIR /app
COPY python_server/requirements.txt .
RUN pip install -r requirements.txt
COPY --from=scraper /scraped_data/scraped_data.json ./scraped_data.json
COPY python_server/ .
EXPOSE 5000
CMD ["python", "server.py"]
