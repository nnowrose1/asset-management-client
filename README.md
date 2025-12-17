# AssetNexus

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge&logo=netlify)](https://tranquil-empanada-81ec32.netlify.app/)


## 📝 Project Description  
AssetNexus is a modern B2B platform designed to streamline HR and asset management for companies of all sizes. The platform allows HR teams to onboard employees, manage asset allocation, and track requests in a secure and organized environment. With real-time updates, clear workflows, and easy reporting, AssetNexus ensures transparency and efficiency in managing company resources. 

## 🔥 Key Features  
Employee Management:
Seamlessly onboard employees, manage profiles, and assign roles within the company.

Asset Management:
Track company assets, assign returnable and non-returnable items, and maintain accurate inventory levels.

Request & Approval Workflow:
Employees can request assets, and HR can approve, reject, or track requests, ensuring accountability.

Upcoming Birthdays & Team Insights:
Easily view employee birthdays, team structures, and company affiliations for better team engagement.

Dashboard & Analytics:
Provides HR and employees with a clear overview of resources, allocations, and usage statistics.

Role-Based Access Control:
Ensure security by giving HR, employees, and admins access only to relevant sections of the platform. 

## Technical Highlights

- **Frontend:**
  - Built with **React** and **Tailwind CSS** for a responsive and modern UI.
  - **React Query** for efficient server-state management and data fetching.
  - **Framer Motion** for smooth animations and interactive UI components.
  - Role-based components for HR and employees with dynamic dashboards.

- **Backend:**
  - **Node.js** with **Express.js** for RESTful APIs.
  - **MongoDB** for flexible document-based storage.
  - **JWT Authentication** for secure, role-based access control.
  - Modular API routes for assets, employees, and company management.

- **File & Image Handling:**
  - Profile images and company logos are uploaded via **IMGBB API**.
  - Secure and optimized file handling with proper validations.

- **Extras:**
  - Clean folder structure and reusable components for scalability.
  - Fully responsive, mobile-friendly design.
  - Easy integration with third-party APIs and future extensions.


---

## Dependencies  
List of required dependencies or major libraries:

```json
{
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "chart.js": "^4.5.1",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.561.0",
    "react": "^19.2.0",
    "react-chartjs-2": "^5.3.1",
    "react-dom": "^19.2.0",
    "react-fast-marquee": "^1.6.5",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-to-print": "^3.2.0",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17"
}
```

## Dev Dependencies  
List of required devDependencies:

```json
{
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "daisyui": "^5.5.8",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
}
```
## ✅ Installation & Setup 
Follow these steps to run the project locally:
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/nnowrose1/asset-management-client
cd asset-management-client
npm install

2. Set up environment variables by creating a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
```
3. Run the application:

```bash
npm run dev
```
---

## Folder Structure

```plaintext
your-project/
│
├── src/
│   ├── components/
|   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   └── customHooks/
├── public/
└── package.json
```

---