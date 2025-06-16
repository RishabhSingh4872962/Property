# 🏡 Property Rental App

A cross-platform **React Native** app built with **Expo**, designed for browsing properties, viewing detailed information, and booking rentals. It features **Map integration**, **DatePickers**, **Zustand/Jotai** for state management, **React Query** for data fetching, and a mock backend using `json-server`.

---

## ✨ Features

- 📍 View property listings with address and map location
- 📆 Select check-in and check-out dates
- 🏠 Book properties directly from the app
- 📂 View your bookings
- 🎨 Tailwind-styled UI using `nativewind`
- 🗃️ Local backend using `json-server`

---

## 📦 Tech Stack

- **React Native (Expo SDK 53)**
- **Expo Router**
- **React Query** – for API data caching
- **Zustand & Jotai** – for state management
- **Axios** – for API requests
- **React Native Maps** – map integration
- **Tailwind CSS** – via `nativewind`
- **json-server** – for local mock API

---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/<your-username>/property-rental-app.git

cd property-rental-app

yarn        # or npm install

2. Start the Mock Backend (json-server)

A sample db.json is already included in the root of the repo.




npx json-server db.json --port 3000
This will run the mock API at:



http://localhost:3000
3. Configure the API URL
Open constants/url.ts and set the server address:

✅ Emulator (Android/iOS):
Use localhost:
export const serverAPI = "http://localhost:3000";

✅ Note: On Android emulators, use http://10.0.2.2:3000 instead of localhost.

📱 Physical Device:
Make sure your phone and PC are on the same Wi-Fi.

Find your local IP address:
# Windows
ipconfig

# macOS/Linux
ifconfig
Find the IPv4 Address (e.g., 192.168.0.158), then update the file:
url.ts


export const serverAPI = "http://192.168.0.158:3000";
📱 Running the App


LOOM VIDEO:
https://www.loom.com/share/246fd5aa93c7441eb2bcf240c7ba2ae9

yarn start       # or npm run start
Use Expo Go to scan the QR code for physical devices.

Use Android Studio/iOS Simulator to run on emulators.

```
