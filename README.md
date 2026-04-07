# My11circle-Clone


## 📌 Project Overview

This project is a backend practice application inspired by fantasy sports platforms like Dream11 and My11Circle. The main goal of this project was to understand and implement backend development concepts using Node.js and Express.js.

The application allows users to register and log in, and view different types of match data such as:
- Upcoming matches  
- Live matches  
- Completed matches  

This data is fetched using an external Sports API. The project uses server-side rendering to dynamically display content to users.

Due to the limitation of free APIs, advanced features like player statistics, fantasy points calculation, and team creation are not implemented. However, the project successfully demonstrates core backend concepts and real-world API integration.

---

## 🧑‍💻 My Experience

Working on this project was a significant step in my backend development journey. This project was built as a hands-on practice while learning Node.js and Express.js, where I focused on creating a structured and functional web application from scratch.

During development, I implemented the MVC (Model-View-Controller) architecture, which helped me understand how to organize code efficiently and build scalable applications. I also worked with server-side rendering, which gave me a clear understanding of how dynamic data is processed and rendered on the server before being sent to the client.

One of the key highlights of this project was integrating a Sports API. Using this API, I was able to fetch and display:
- Upcoming matches  
- Live matches  
- Completed matches  

Due to the limitation of free APIs, I could not implement player-level data such as individual performance tracking, points calculation, or team creation features. However, this limitation helped me understand real-world development challenges and API dependency issues.

I also implemented user authentication features such as registration and login. Although route protection using tokens (JWT and cookies) is not fully implemented yet, working on this part helped me understand authentication flow and the importance of securing routes.

---

## 🔍 Key Learnings

- Strong understanding of Node.js and Express.js fundamentals  
- Practical implementation of MVC architecture  
- Experience with server-side rendering (SSR)  
- API integration and handling external data  
- Understanding authentication flow and its importance  
- Problem-solving under real-world limitations  

---

## ▶️ How to Run This Project

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
```
### 2. Navigate to project folder
```bash
cd your-repo-name
```

### 3. npm install
```bash
npm install
```
### 4. Create .env file
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SPORTS_API_KEY=your_api_key

MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_email_app_password
MAIL_PORT=465
MAIL_HOST=smtp.gmail.com
```
### 5. Run the server
```bash
npm start
```
