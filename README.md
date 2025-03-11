# Retail Pulse Backend API

## 📌 Project Overview

This project is a backend service for processing images collected from stores. It allows users to submit jobs containing image URLs and store IDs, processes the images asynchronously, and provides job status updates.

## 🚀 Features

- Submit a job with store images.
- Asynchronous image processing.
- Calculate the image perimeter.
- Simulate GPU processing with a random delay (0.1 to 0.4 seconds).
- Retrieve job status (ongoing, completed, or failed).
- Data is fetched from a CSV file containing store details.

---

## ⚙️ Tech Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **TypeScript** (Static typing)
- **Axios** (HTTP requests)
- **Sharp** (Image processing)
- **csv-parser** (CSV file handling)
- **Docker** (Optional containerization)

---

## 📂 Directory Structure


retail-pulse-backend/
├── src/
│   ├── controllers/
│   │   ├── jobController.ts
│   ├── services/
│   │   ├── imageProcessor.ts
│   ├── utils/
│   │   ├── jobQueue.ts
│   │   ├── csvLoader.ts
│   ├── data/
│   │   ├── stores.csv
│   ├── routes.ts
│   ├── server.ts
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md


---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

bash
git clone https://github.com/your-repo/retail-pulse-backend.git
cd retail-pulse-backend


### **2️⃣ Install Dependencies**

bash
npm install


### **3️⃣ Run the Server**

bash
npx ts-node src/server.ts


- The server will start on `http://localhost:3000`

### **(Optional) Run Using Docker**

bash
docker-compose up --build


---

## 🛠️ API Endpoints & Testing in Postman

### **1️⃣ Submit a Job**

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/submit`
- **Headers:** `Content-Type: application/json`
- **Body:**

json
{
   "count": 2,
   "visits": [
      {
         "store_id": "RP00001",
         "image_url": [
            "https://www.gstatic.com/webp/gallery/2.jpg",
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "2024-03-11T10:00:00Z"
      },
      {
         "store_id": "RP00002",
         "image_url": [
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "2024-03-11T10:30:00Z"
      }
   ]
}


- **Expected Response:**

json
{ "job_id": "123e4567-e89b-12d3-a456-426614174000" }


---

### **2️⃣ Get Job Status**

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/status?jobid=123e4567-e89b-12d3-a456-426614174000`
- **Expected Responses:**
  - If **ongoing**:
    json
    { "status": "ongoing", "job_id": "123e4567-e89b-12d3-a456-426614174000" }
    
  - If **completed**:
    json
    { "status": "completed", "job_id": "123e4567-e89b-12d3-a456-426614174000" }
    
  - If **failed**:
    json
    {
        "status": "failed",
        "job_id": "123e4567-e89b-12d3-a456-426614174000",
        "error": [
            { "store_id": "RP00001", "error": "Image download failed" }
        ]
    }
    
  - If **invalid job\_id**:
    json
    { "error": "Job not found" }
    

---

## 🔍 Debugging & Troubleshooting

### **Issue: Server Not Running**

- Ensure you ran:
  bash
  npx ts-node src/server.ts
  
- Check for errors in the logs.
- If using Docker, run:
  bash
  docker-compose up --build
  

### **Issue: ****`ECONNREFUSED 127.0.0.1:3000`**** in Postman**

- Ensure the server is running.
- Check if `.env` specifies a different port (`PORT=5000`).
- Try:
  bash
  kill -9 $(lsof -t -i:3000) # For Linux/macOS
  

---

## 🔮 Future Improvements

- Use **Redis** for job queue persistence.
- Store processed data in **MongoDB/PostgreSQL**.
- Implement **WebSockets** for real-time job tracking.
- Amazon S3 for image object store.
- Add **unit tests** using Jest/Mocha.

---

## 🎯 Conclusion

This backend efficiently handles store image processing using **Node.js, Express, TypeScript, and CSV-based store data**. 🚀

**Now, you can submit jobs and track their status using Postman!** 🎉

