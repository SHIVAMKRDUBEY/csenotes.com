# 🚀 CSE Notes – Full Stack Project

A complete **Full Stack Web Application** for providing Notes, Interview Questions, and Company-wise preparation content.

---

# 🌐 Live Website

👉 https://csenotes.com

---

# 📌 Project Overview

CSE Notes is a platform where users can:

* 📚 Read subject-wise notes
* 💼 Prepare interview questions
* 🏢 Explore company-wise interview rounds
* 🔍 Access topic-wise structured content

---

# 🧠 Technologies Used (Detailed)

## 🔹 Frontend

* **Next.js 16** (App Router)
* **React.js**
* **JavaScript (ES6+)**
* **CSS / Tailwind (if used)**
* **Dynamic Routing (SEO friendly URLs)**
* **Server Components + Client Components**

## 🔹 Backend

* **Spring Boot (Java)**
* **REST API**
* **JWT Authentication (Used)**
* **Layered Architecture**

  * Controller
  * Service
  * Repository

## 🔹 Database

* **MySQL / PostgreSQL** (depending on your setup)
* JPA / Hibernate ORM

## 🔹 DevOps / Deployment

* **Ubuntu Server (AWS EC2)**
* **Nginx (Reverse Proxy)**
* **PM2 (Process Manager)**
* **SSL (Let's Encrypt)**

## 🔹 SEO & Analytics

* Dynamic Sitemap (Next.js)
* Meta Tags Optimization
* Google Analytics (GA4)
* Facebook Pixel

---

# 🖥️ Local Setup (Run on Your Machine)

## 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/csenotes.git
cd csenotes
```

---

## 🔹 2. Backend Setup (Spring Boot)

```bash
cd backend
```

### ▶ Install Dependencies

Make sure you have:

* Java 17+
* Maven

```bash
mvn clean install
```

### ▶ Run Backend

```bash
mvn spring-boot:run
```

Backend will run on:

```
http://localhost:8086
```

---

## 🔹 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

### ▶ Environment File

Create `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8086/api
NEXT_PUBLIC_GA_ID=YOUR_GA_ID
NEXT_PUBLIC_FB_PIXEL_ID=YOUR_PIXEL_ID
```

---

### ▶ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🌍 Production Deployment (Ubuntu Server)

## 🔹 1. Install Required Tools

```bash
sudo apt update
sudo apt install nginx git nodejs npm openjdk-17-jdk -y
npm install -g pm2
```

---

## 🔹 2. Build Frontend

```bash
cd frontend
npm install
npm run build
```

---

## 🔹 3. Start Frontend with PM2

```bash
pm2 start npm --name "nextjs" -- start
pm2 save
pm2 startup
```

---

## 🔹 4. Run Backend

```bash
cd backend
mvn spring-boot:run
```

(Or use PM2 / systemd for production)

---

## 🔹 5. Nginx Configuration

```nginx
server {
    listen 80;
    server_name csenotes.com www.csenotes.com;
    return 301 https://csenotes.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name csenotes.com;

    ssl_certificate /etc/letsencrypt/live/csenotes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/csenotes.com/privkey.pem;

    location /api/ {
        proxy_pass http://127.0.0.1:8086;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

---

## 🔹 6. Restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

# 🧩 Sitemap & SEO

* Dynamic sitemap generated via Next.js
* Includes:

  * Notes
  * Topics
  * Interview Questions
  * Company pages

Example:

```
/notes/operating-system/process-management.htm
/interview/java/oops-concepts.htm
```

---

# ⚠️ Common Issues & Fixes

## ❌ API 403 Error

* Fix Nginx rewrite rules
* Ensure `/api/` is directly proxied

## ❌ Sitemap not updating

* Add:

```js
export const dynamic = "force-dynamic";
```

## ❌ Data not loading

* Check:

```env
NEXT_PUBLIC_API_BASE_URL
```

---

# 📦 Features

* SEO Optimized URLs
* Fast Loading (SSR + caching)
* Structured Data
* Clean UI
* Scalable Architecture

---

# 👨‍💻 Author

Developed by **Shivam and group**

---

# ⭐ Contribution

Feel free to fork, improve, and contribute 🚀

---

# 📜 License

This project is for educational purposes.
