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


---

### Authentication

| Method | Endpoint      | Description                  | Request Body                                               | Response                  |
|--------|---------------|------------------------------|------------------------------------------------------------|---------------------------|
| POST   | /auth/signup  | Register a new user          | `{ "name": "John", "email": "john@example.com", "password": "123456" }` | User object + JWT token    |
| POST   | /auth/login   | Login user and get JWT       | `{ "email": "john@example.com", "password": "123456" }`   | JWT token + user data      |

> ⚠️ All requests that require authentication must include `Authorization: Bearer <JWT>` in headers.

---

### Todos (Tasks / Habits)

| Method | Endpoint     | Description                  | Request Body                                               | Response                  |
|--------|-------------|-------------------------------|------------------------------------------------------------|---------------------------|
| GET    | /todos      | Fetch all todos for a user    | –                                                          | Array of todos            |
| POST   | /todos      | Create a new todo             | `{ "title": "Read Book", "type": "hobby", "priority": "medium", "due_date": "2026-03-10" }` | Created todo object       |
| PUT    | /todos/:id  | Update a todo                 | `{ "title": "New Title", "status": true }`                | Updated todo object       |
| DELETE | /todos/:id  | Delete a todo                 | –                                                          | Success message           |

---

### Habits

| Method | Endpoint      | Description                | Request Body                     | Response                  |
|--------|---------------|----------------------------|---------------------------------|---------------------------|
| GET    | /habits       | Get all habits for a user  | –                               | Array of habits           |
| POST   | /habits       | Create a new habit         | `{ "habit_name": "Exercise" }`  | Created habit object      |
| PUT    | /habits/:id   | Update habit progress      | `{ "completed_days": ["2026-03-01"] }` | Updated habit object |
| DELETE | /habits/:id   | Delete a habit             | –                               | Success message           |

---

### Goals

| Method | Endpoint      | Description                  | Request Body                                                      | Response                  |
|--------|---------------|------------------------------|-------------------------------------------------------------------|---------------------------|
| GET    | /goals        | Fetch all goals for a user   | –                                                                 | Array of goals            |
| POST   | /goals        | Create a new goal            | `{ "goal_name": "Learn React", "category": "career", "target_date": "2026-06-01" }` | Created goal object       |
| PUT    | /goals/:id    | Update a goal                | `{ "progress": 50 }`                                              | Updated goal object       |
| DELETE | /goals/:id    | Delete a goal                | –                                                                 | Success message           |



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



### Daily Moods Table

| Column      | Type        | Description                                                    |
|------------|------------|----------------------------------------------------------------|
| id         | UUID       | Primary key (auto-generated with `gen_random_uuid()`)          |
| user_id    | UUID       | References `users(id)` – identifies which user logged the mood |
| mood_label | VARCHAR(50)| Text label for the mood (e.g., Happy, Sad, Anxious)            |
| mood_emoji | VARCHAR(10)| Emoji representing the mood                                     |
| mood_value | INT        | Numeric value representing mood intensity                        |
| note       | TEXT       | Optional note or description about the mood                     |
| created_at | TIMESTAMP  | Timestamp of when the mood was recorded (default `NOW()`)       |


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
