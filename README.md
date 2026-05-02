<img width="2565" height="1428" alt="Gemini_Generated_Image_6q2ag6q2ag6q2ag6" src="https://github.com/user-attachments/assets/0f753b01-8fb4-4c14-83ae-82c0b2118e91" />

🌍 ExploIndia
A Travel Social Platform for Explorers of India

ExploIndia is a full-stack travel social networking platform where travelers can share their journeys, explore destinations, interact with other explorers, and discover the beauty of India through community experiences.

The platform allows users to post trips, upload travel photos, like and comment on posts, save favorite trips, receive notifications, and explore other travelers' profiles.

Built with the MERN Stack, ExploIndia focuses on creating an engaging and visually appealing travel experience.


🚀 Live Features

👤 Authentication System

Secure signup & login
JWT authentication
Protected routes
User session management


🧭 Trip Sharing

Users can create travel posts with:
Trip title
Travel description
Location
Multiple travel images
Timestamps
Each trip appears in the community feed for others to explore.

❤️ Social Interaction

Travelers can interact with posts through:
❤️ Likes
💬 Comments
⭐ Favorite trips
🔗 Sharing
This makes the platform feel like a travel-focused social network.

🔔 Smart Notification System

Users receive notifications when:
Someone comments on their trip
A trip is updated
A new trip is created
Social interactions occur
Notifications appear in a live dropdown panel in the header.

👤 Traveler Profiles

Each user profile includes:
Profile picture and cover image
Bio and location
Followers & following
Traveler statistics
Travel interests
Favorite destinations
Bucket list
Users can explore other travelers' profiles and see their trips.

⭐ Favorite Trips

Users can save trips they love.
Saved trips appear in the Favorites section of their profile.

📊 Traveler Insights

Traveler statistics show:
Places visited
States explored
Travel interests
Favorite travel style
Bucket list destinations

🔍 Search Feature

Users can search for:
Travelers
Destinations
Trips

🖼 Image Upload System

Trips support multiple image uploads using Cloudinary cloud storage.
Features include:
Image preview
Optimized cloud storage
High quality images

🎨 Modern UI / UX

The UI includes:
Glassmorphism design
Smooth animation
Responsive layout
Dark mode support
Interactive trip cards
The goal is to create an immersive travel experience.

🏗 Tech Stack

Frontend
React.js
React Router
Tailwind CSS
Axios
Backend
Node.js
Express.js
MongoDB
Mongoose
Authentication
JSON Web Token (JWT)
File Upload
Multer
Cloudinary
Development Tools
Git
GitHub
DevTunnels / Ngrok


📂 Project Structure
ExploIndia
│
├── client
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── context
│   └── services
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── config
│
└── README.md

⚙️ Installation Guide
1️⃣ Clone the repository
git clone https://github.com/yourusername/exploindia.git
cd exploindia
2️⃣ Install Dependencies

Frontend

cd client
npm install

Backend

cd server
npm install


3️⃣ Environment Variables

Create .env file inside server folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


4️⃣ Run the Application

Start backend

npm run server

Start frontend

npm run dev


📸 Screenshots

Welcome Page
<img width="1919" height="1011" alt="Screenshot 2026-02-22 190606" src="https://github.com/user-attachments/assets/74682379-5361-49a9-8b20-6bd19080dea2" />

Home Feed
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/23af799d-e86c-4e0a-acea-d2c793fcb437" />

Trip Post
<img width="965" height="1023" alt="image" src="https://github.com/user-attachments/assets/622212b6-bf51-4334-8ab7-2da0394adf5c" />

User Profile
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/762cdf4c-e52e-45df-aaa2-8c3b12bdc039" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/158b21e9-63a5-4395-a9ed-1727fd57cac4" />

Notifications
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/54293f82-808f-4da9-98ef-615d916fcb1c" />

Create Trip
<img width="1920" height="1080" alt="Screenshot 2026-02-22 192327" src="https://github.com/user-attachments/assets/40ee25e2-fc00-41ee-8887-b52f14a8d8f2" />


🌟 Future Improvements

Planned features:

🔴 Real-time notifications using Socket.IO

👥 Follow / Unfollow system

🌍 Travel map integration

🔥 Explore trending destinations

🤖 Trip recommendation system

📱 Mobile app version

🧭 AI travel assistant

🤝 Contributing

Contributions are welcome.

Steps:

Fork the repository

Create a feature branch

Commit changes

Submit pull request


📜 License

This project is licensed under the MIT License.


👨‍💻 Author

Adarsh Sharma

Developer of ExploIndia

GitHub:
https://github.com/yourusername



🌍 Vision of ExploIndia

Travel is more than just visiting places.

It is about stories, experiences, and connections.

ExploIndia aims to build a community where travelers can:

share their journeys

discover hidden destinations

inspire others to explore India

⭐ If you like this project, consider starring the repository on GitHub.
