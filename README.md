# Digital Planner & Journal - Backend

## Project Overview
This backend service powers the **Digital Planner & Journal** application. It provides RESTful APIs for managing user authentication, journals, and notifications. The backend handles all CRUD operations, authentication, and integration with email services.

---

## Tech Stack
- **Node.js** – JavaScript runtime for server-side logic  
- **Express.js** – Framework for building REST APIs  
- **Supabase** – Database and authentication (PostgreSQL)  
- **Axios** – HTTP client  
- **Render / Vercel** – Deployment platform  

---

## API Documentation

### Base URL


### Authentication
- **POST /auth/signup** – Register a new user  
- **POST /auth/login** – Login and receive JWT  

### Journals
- **GET /journals** – Fetch all journal entries  
- **POST /journals** – Create a new journal entry  
- **PUT /journals/:id** – Update a journal entry  
- **DELETE /journals/:id** – Delete a journal entry  

> ⚠️ All endpoints requiring authentication must include a valid JWT token in the `Authorization` header.

---

## Database Schema Explanation

### Users Table
| Column         | Type    | Description                 |
|----------------|---------|-----------------------------|
| id             | UUID    | Primary key                 |
| name           | String  | Full name of the user       |
| email          | String  | Unique email address        |
| password       | String  | Hashed password             |
| profile_image  | String  | URL of profile picture      |

### Journals Table
| Column        | Type     | Description                        |
|---------------|----------|------------------------------------|
| id            | UUID     | Primary key                        |
| user_id       | UUID     | Foreign key referencing Users      |
| title         | String   | Journal entry title                |
| content       | Text     | Journal content                     |
| created_at    | DateTime | Timestamp of creation              |


### Todos Table (Tasks)
| Column      | Type      | Description                                                                 |
|------------|-----------|-----------------------------------------------------------------------------|
| id         | UUID      | Primary key (auto-generated with `gen_random_uuid()`)                        |
| title      | TEXT      | Title of the task                                                           |
| type       | TEXT      | Task type (`work`, `hobby`, `personal`)                                     |
| priority   | TEXT      | Task priority (`low`, `medium`, `high`)                                     |
| due_date   | TIMESTAMP | Deadline for the task (optional)                                            |
| status     | BOOLEAN   | Task completion status (`false` by default)                                  |
| user_id    | UUID      | References `users(id)` – cascade on delete                                  |
| created_at | TIMESTAMP | Timestamp of task creation (default `now()`)                                 |

---

### Habits Table
| Column         | Type      | Description                                                                 |
|----------------|-----------|-----------------------------------------------------------------------------|
| id             | UUID      | Primary key (auto-generated with `gen_random_uuid()`)                        |
| habit_name     | TEXT      | Name of the habit                                                            |
| user_id        | UUID      | References `users(id)` – cascade on delete                                   |
| completed_days | TEXT[]    | Array of dates when the habit was completed (`default '{}'`)                |
| created_at     | TIMESTAMP | Timestamp of habit creation (default `now()`)                                 |

---

### Goals Table
| Column       | Type      | Description                                                                 |
|-------------|-----------|-----------------------------------------------------------------------------|
| id          | UUID      | Primary key (auto-generated with `gen_random_uuid()`)                        |
| user_id     | UUID      | References `users(id)` – cascade on delete                                   |
| goal_name   | TEXT      | Name of the goal                                                            |
| category    | TEXT      | Category of the goal (`personal`, `academic`, `career`)                     |
| progress    | INTEGER   | Goal completion percentage (0 to 100, default `0`)                           |
| target_date | DATE      | Target date to achieve the goal (optional)                                  |
| created_at  | TIMESTAMP | Timestamp of goal creation (default `now()`)                                 |

---

> ⚠️ All foreign keys reference the `users` table and use `ON DELETE CASCADE` to maintain data integrity.  

---

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/backend-repo.git
cd backend-repo
```
2. Install Dependencies
```bash
npm install
```
3. Create a .env file
```bash
PORT=8990
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
```
4. Start the Server
```bash
node index.js
```
## Deployment Link
https://digital-planner-and-journal-backend-3zdi.onrender.com
