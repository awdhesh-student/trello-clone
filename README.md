## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/awdhesh-student/trello-clone.git
   cd trello clone

   ```

2. Install backend dependencies:

   cd backend
   npm install

3. Install frontend dependencies:

   cd ../frontend
   npm install

4. Running the Project:
   Set up the environment variables. Create a .env file in the server directory and add the following variables:

   MONGO_DB="your_mongo_connection_string"
   PORT=8002
   JWT_KEY="your_jwt_secret"

   NOTE: `Replace your_mongo_connection_string and your_jwt_secret with your actual MongoDB connection string and JWT secret key.`

   Start the backend server:

   cd backend
   npm start
The server will start on port 8001

Start the frontend:

   cd ../frontend
   npm start
   The client will start on http://localhost:5173.

