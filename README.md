# HealthFlow

HealthFlow is a web application designed to help users track their health symptoms, manage medications, and receive personalized health insights. Built with React and Firebase, HealthFlow provides a user-friendly interface for monitoring personal health and wellness.

## Features

- User Authentication: Secure login and registration system
- Dashboard: Personalized user dashboard
- Symptom Tracker: Log and monitor health symptoms
- Medication Manager: Keep track of medications and dosages
- Health Insights: Receive AI-powered health information based on logged symptoms

## Technologies Used

- React.js
- Firebase Authentication
- CSS3
- Gemini AI API for health insights

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A Firebase account
- A Gemini AI API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/healthflow.git
   ```

2. Navigate to the project directory:
   ```
   cd healthflow
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase and Gemini AI API configurations:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

## Usage

To run the application locally:

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and visit `http://localhost:3000`

## Project Structure

```
healthflow/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── SymptomTracker.js
│   │   └── MedicationManager.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── HomePage.css
│   │   ├── Login.js
│   │   ├── LoginPage.css
│   │   ├── Register.js
│   │   ├── shared.css
│   │   └── PrivateRoute.js
│   │
│   ├── api/
│   │   └── geminiApi.js
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── firebase.js
│
├── .env
├── package.json
└── README.md
```

## License

This project is under a proprietary license. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

If you have any questions or feedback, please contact us at:

Onesmus Dzidzai - dzidzaimaenza@gmail.com

Project Link: [https://github.com/oni1997/healthflow](https://github.com/oni1997/healthflow)