🌐 Live URLs
Frontend (Website):
https://csenotes.com

🚀 CSE Notes – Full Setup Guide (Local + Production)
🧑‍💻 PART 1: LOCAL MACHINE SETUP (Development)
📌 Requirements

Install these first:

Node.js (v18+ recommended)
Java (JDK 17)
Git

Check:

node -v
java -version
git --version
🧱 1. BACKEND SETUP (Spring Boot)
📁 Step 1: Open backend project
cd backend
▶️ Step 2: Run backend

If using Maven:

./mvnw spring-boot:run

Or:

mvn spring-boot:run
🌐 Step 3: Test API

Open in browser:

http://localhost:8086/api/txtnotes

👉 If data shows → backend is working ✅

🌐 2. FRONTEND SETUP (Next.js)
📁 Step 1: Open frontend
cd next
🔐 Step 2: Create .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8086/api
📦 Step 3: Install dependencies
npm install
▶️ Step 4: Run frontend
npm run dev
🌍 Step 5: Open website
http://localhost:3000
🔄 LOCAL FLOW
Browser → Next.js (3000) → API (8086) → Database
🌍 PART 2: PRODUCTION DEPLOYMENT (SERVER)
🧱 1. SERVER SETUP (Ubuntu)
sudo apt update && sudo apt upgrade -y
Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
Install Java
sudo apt install openjdk-17-jdk -y
Install Nginx
sudo apt install nginx -y
Install PM2
npm install -g pm2
⚙️ 2. BACKEND DEPLOYMENT
📁 Step 1: Upload JAR
cd /home/ubuntu
mkdir backend
cd backend

Upload .jar file

▶️ Step 2: Run backend
java -jar your-backend.jar
🔁 Step 3: Run with PM2
pm2 start "java -jar /home/ubuntu/backend/your-backend.jar" --name backend
pm2 save
pm2 startup
🧪 Test backend
curl http://127.0.0.1:8086/api/txtnotes
🌐 3. FRONTEND DEPLOYMENT
📁 Step 1: Upload project
cd /home/ubuntu
git clone <your-repo>
cd next
🔐 Step 2: Environment
NEXT_PUBLIC_API_BASE_URL=https://csenotes.com/api
📦 Step 3: Install
npm install
🏗️ Step 4: Build
npm run build
▶️ Step 5: Run
pm2 start npm --name "nextjs" -- start
pm2 save
🌍 4. NGINX SETUP (IMPORTANT)
sudo nano /etc/nginx/sites-available/default

Paste this:

server {
    listen 80;
    server_name csenotes.com www.csenotes.com;
    return 301 https://csenotes.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.csenotes.com;

    ssl_certificate /etc/letsencrypt/live/csenotes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/csenotes.com/privkey.pem;

    return 301 https://csenotes.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name csenotes.com;

    ssl_certificate /etc/letsencrypt/live/csenotes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/csenotes.com/privkey.pem;

    # API
    location /api/ {
        proxy_pass http://127.0.0.1:8086/;
        proxy_set_header Host $host;
    }

    # Uploads
    location /uploads/ {
        alias /home/ubuntu/csenotes/uploads/;
    }

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
}
🔁 Restart nginx
sudo nginx -t
sudo systemctl restart nginx
🔐 5. ENABLE HTTPS
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d csenotes.com -d www.csenotes.com
🧪 6. FINAL TEST
✅ Website
https://csenotes.com
✅ API
https://csenotes.com/api/txtnotes
✅ Sitemap
https://csenotes.com/sitemap.xml
❌ COMMON PROBLEMS
🔴 API not working

👉 Check:

curl http://127.0.0.1:8086/api/txtnotes
🔴 403 Error

👉 Fix nginx (remove wrong rewrites)

🔴 Images not loading
location /uploads/ {
    alias /home/ubuntu/csenotes/uploads/;
}
🔴 Sitemap empty

👉 API not working → fix backend

🔄 RESTART ALL
pm2 restart all
sudo systemctl restart nginx
🎯 FINAL ARCHITECTURE
User → Nginx → Next.js → API → Spring Boot → Database
