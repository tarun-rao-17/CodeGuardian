# CodeGuardian

CodeGuardian is a *code review platform* built with *Vite for the frontend, **Express.js for the backend, and **Firebase as the database*. It is designed to enhance code collaboration, improve code quality, and streamline the review process for development teams.

- [Prototype Video URL](https://drive.google.com/file/d/1EqDMnL-A3IoBrmdgqmJoB4UOK3eSJFNU/view?usp=sharing)

---

## 🚀 Get Started

### Prerequisites

- Node.js installed
- Firebase project set up

### Clone the Repository

bash
git clone https://github.com/your-repo/codeguardian.git
cd codeguardian


### Install Dependencies

- For the frontend:

bash
cd frontend
npm install


- For the backend:

bash
cd ../backend
npm install


### Run the Application

- Start the backend server:

bash
npx nodemon


- Start the Vite development server:

bash
npm run dev


---

## 📌 Features Overview

### ✅ User Authentication
- Firebase Auth for secure login and access control.

### 🖥 Code Editor
- Built-in editor to write and run code.

### 🧐 Code Review System
- Provide detailed feedback with suggestions for code optimization, performance improvements, and best practices.

### 🤖 Smart Chatbot for Code Assistance
- An AI chatbot that answers specific coding queries and explains detected issues, offering personalized guidance.

### 🔐 Secure Code Parsing
- Prevents malicious code execution during analysis.

### 🔄 Real-time Collaboration

### 🎨 Syntax Highlighting

### 🛠 Version Control Integration

---

## 🌟 Tech Stack

- *Frontend*: Vite + React.js
- *Backend*: Express.js
- *Database*: Firebase Firestore
- *Authentication*: Firebase Auth
- *Real-time Communication*: Firebase Realtime Database

---

## 📲 API Endpoints

| Endpoint         | Method | Description         |
| ---------------- | ------ | ------------------- |
| /api/auth/login  | POST   | User login          |
| /api/snippets    | GET    | Fetch code snippets |
| /api/review/:id | POST   | Add review comment  |

---

## 🚧 Future Prospects

### 1. Static-Code Analysis using SonarQube Cloud

- *Automated suggestions for code optimization* and performance improvements.
- *Integrate SonarQube* for static code analysis and identifying code smells.

### 2. Advanced Chatbot with RAG and Bhashini Support

- *RAG (Retrieval-Augmented Generation) chatbot* to assist with in-depth code explanations.
- *Bhashini support* for multilingual code assistance.

### 3. Open-source API for Campus Coding Questions

- Leverage *open-source APIs to detect and resolve coding problems from company campus recruitment tests*.

### 4. CI/CD Pipeline Integration

- Enable *automated testing and deployment pipelines* for continuous integration and delivery.

### 5. Scalable Architecture

- With Firebase's cloud infrastructure, *scaling for large teams and projects* becomes seamless.

---

## 👥 Community & Contributions

Feel free to open issues and submit pull requests to contribute to CodeGuardian.

---

With *CodeGuardian, developers can not only improve code quality but also **enhance team collaboration, **boost productivity, and **ensure secure code deployment*.
