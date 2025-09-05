# 🚀 Real-Time Object Detection Web App

A full-stack **object detection application** built with **React.js (frontend)** and **Django REST + YOLOv8 (backend)**, fully deployed on **Render**.  
Users can upload images, and the app returns annotated images with bounding boxes, labels, and confidence scores in real-time.  

---

## ✨ Features
- 📤 Upload any image via the React frontend  
- 🔍 Detect objects in real-time using **YOLOv8 Nano** model  
- 🖼️ Annotated images with bounding boxes, labels, and confidence scores  
- ⚡ Lightweight model for **fast inference & low memory usage**  
- ☁️ Fully deployed with **Render** (frontend + backend)  

---

## 🛠️ Tech Stack
**Frontend:** React.js  
**Backend:** Django REST Framework, Gunicorn  
**Machine Learning:** YOLOv8 (Ultralytics)  
**Image Processing:** OpenCV, NumPy, Pillow  
**Deployment:** Render  

---

## ⚙️ How It Works
1. User uploads an image via the React frontend.  
2. The image is sent to the Django REST API.  
3. **YOLOv8 Nano model** performs object detection.  
4. Bounding boxes, labels, and confidence scores are generated.  
5. Annotated image + detection data are returned to the frontend.  
6. Results are displayed in an **interactive, user-friendly UI**.  

---

## 🔗 Live Demo
- **Frontend (Web App):** [Try it here](https://lnkd.in/evxH2bRx)  
- **Backend (API):** [Explore API](https://lnkd.in/esDwK-bQ)  

---


## 📂 Project Structure
   ├── backend/ # Django REST API with YOLOv8
   │ ├── models/ # YOLOv8 model integration
   │ ├── utils/ # Image processing (OpenCV, Pillow, NumPy)
   │ └── api/ # REST endpoints
   ├── frontend/ # React.js frontend
   │ ├── src/ # Components, pages, services
   │ └── public/ # Static assets
   └── README.md


---

## 🔧 Installation (Local Setup)

1. **Clone the repository**
   ```bash
   git clone [https://github.com/23335a0504raju/object-detection-webapp.git](https://github.com/23335a0504raju/ObjectDetection/)
   cd object-detection-webapp

2. **Backend Setup (Django + YOLOv8)**
   cd backend
   pip install -r requirements.txt
   python manage.py runserver

3. **Frontend Setup (React)**
   cd frontend
   npm install
   npm start
4. **Access the app at:**
   Frontend: http://localhost:3000
   Backend API: http://127.0.0.1:8000/api/
 **🏅 Learning Outcomes**

   Integrated YOLOv8 object detection with a Django REST API 
   Handled real-time image processing on a web server 
   Deployed a full-stack ML application on Render
   Improved skills in cloud deployment, API design, and frontend-backend communication

**📌 Future Improvements**

   Add support for video stream detection
   Implement user authentication & history tracking
   Optimize inference with GPU support
   Enhance UI with detection statistics & charts

**🤝 Contributing**

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.

**📜 License**

This project is licensed under the MIT License.

**👨‍💻 Author**

Chowdavada Raju

LinkedIn

GitHub

Portfolio

Do you also want me to add a **short LinkedIn-style 2–3 line description** (punchy + keyword-heavy) that you can paste directly into your LinkedIn or portfolio under this project?


