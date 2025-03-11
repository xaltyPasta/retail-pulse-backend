# **Retail Pulse Backend Assignment (TypeScript + Node.js)**  

This project is a backend service that processes store images by downloading them, calculating their perimeters, and simulating GPU processing time. The service also allows users to check the status of submitted jobs.

---

## **📌 Features**

✔ Accepts **job submissions** with image URLs and store IDs  
✔ Processes images asynchronously, **calculating perimeters**  
✔ Introduces a **random delay** (0.1 to 0.4 sec) for GPU simulation  
✔ Retrieves **job status** (ongoing, completed, or failed)  
✔ Loads **store data from a CSV file**  

---

## **📂 Project Structure**

```yaml
retail-pulse-backend/
├── src/
│   ├── controllers/
│   │   ├── jobController.ts        # Handles API logic
│   ├── services/
│   │   ├── imageProcessor.ts       # Processes images
│   ├── utils/
│   │   ├── jobQueue.ts             # Job queue management
│   │   ├── csvLoader.ts            # Loads store data from CSV
│   ├── data/
│   │   ├── stores.csv              # CSV file with store data
│   ├── routes.ts                   # Handles API routing (switch-case)
│   ├── server.ts                   # Main Express server
├── docker/
│   ├── Dockerfile                  # Docker setup
│   ├── docker-compose.yml          # Docker Compose config
├── .gitignore                       # Ignores unnecessary files
├── package.json                     # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── README.md                        # Documentation
```

---

## **🚀 Setup & Installation**

### **1️⃣ Install Dependencies**

```sh
npm install
```

### **2️⃣ Run the Server**

```sh
npx ts-node src/server.ts
```

### **3️⃣ Run Using Docker**

```sh
docker-compose up --build
```

By default, the server runs on **`http://localhost:3000`**.

---

## **📌 API Endpoints**

### **1️⃣ Submit a Job (POST `/api/submit`)**

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/submit`
- **Headers:** `Content-Type: application/json`

- **Body:**

```json
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
```

- **Response (201 Created)**:

```json
{ "job_id": "123e4567-e89b-12d3-a456-426614174000" }
```

---

### **2️⃣ Get Job Status (GET `/api/status`)**

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/status?jobid=123e4567-e89b-12d3-a456-426614174000`

#### **Possible Responses**

- **Ongoing Job**

```json
{ "status": "ongoing", "job_id": "123e4567-e89b-12d3-a456-426614174000" }
```

- **Completed Job**

```json
{ "status": "completed", "job_id": "123e4567-e89b-12d3-a456-426614174000" }
```

- **Failed Job**

```json
{
    "status": "failed",
    "job_id": "123e4567-e89b-12d3-a456-426614174000",
    "error": [{ "store_id": "RP00001", "error": "Image download failed" }]
}
```

- **Invalid Job ID**

```json
{ "error": "Job not found" }
```

---

## **🛠 Troubleshooting**

## **1️⃣ Server Not Running (`ECONNREFUSED 127.0.0.1:3000`)**

```sh
npx ts-node src/server.ts
```

If using **Docker**:

```sh
docker-compose up --build
```

## **2️⃣ Port Already in Use**

```sh
kill -9 $(lsof -t -i:3000)
```

Then restart the server.

## **3️⃣ Check Logs for Errors**

Run:

```sh
npx ts-node src/server.ts
```

---

## **📝 Future Improvements**

✔ Store jobs in **Redis** for better queue management  
✔ Save processed data to **MongoDB/PostgreSQL**  
✔ Implement **WebSockets** for real-time job updates  
✔ Add **Unit Tests (Jest/Mocha)**  

---

## **📜 License**

This project is for **Retail Pulse Backend Intern Assignment** and is **open-source** for learning and improvement. 🚀  
