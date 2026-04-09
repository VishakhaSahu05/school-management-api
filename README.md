# School Management API

A REST API for adding schools and retrieving them sorted by proximity to a given location.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via `mysql2` connection pool)
- **Validation**: Joi
- **Config**: dotenv

---

## Folder Structure

```
school-management-api/
├── config/
│   └── db.js               # MySQL connection pool
├── controllers/
│   └── schoolController.js # Request handlers
├── models/
│   └── schoolModel.js      # Database queries
├── routes/
│   └── schoolRoutes.js     # Route definitions
├── utils/
│   ├── distance.js         # Haversine formula
│   └── validation.js       # Joi schemas
├── middlewares/
│   └── errorHandler.js     # Centralized error handler
├── app.js                  # Express app setup
├── server.js               # Entry point
├── schema.sql              # DB creation + seed data
├── postman_collection.json
├── .env.example
└── package.json
```

---

## Database Setup

1. Start your MySQL server.
2. Run the schema file:

```bash
mysql -u root -p < schema.sql
```

This creates the `schooldb` database, the `schools` table, and inserts sample rows.

**Table schema:**

```sql
CREATE TABLE schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   VARCHAR(255) NOT NULL,
  latitude  FLOAT        NOT NULL,
  longitude FLOAT        NOT NULL
);
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=schooldb
```

---

## How to Run

```bash
# Install dependencies
npm install

# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts on `http://localhost:5000`.

---

## API Documentation

### `POST /addSchool`

Adds a new school to the database.

**Request body:**

```json
{
  "name": "ABC School",
  "address": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Success response** `201`:

```json
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 1
}
```

**Validation error** `400`:

```json
{
  "success": false,
  "message": "\"name\" is not allowed to be empty"
}
```

---

### `GET /listSchools`

Returns all schools sorted by distance (ascending) from the provided coordinates.

**Query parameters:**

| Param       | Type   | Required |
|-------------|--------|----------|
| `latitude`  | number | Yes      |
| `longitude` | number | Yes      |

**Example:**

```
GET /listSchools?latitude=28.61&longitude=77.20
```

**Success response** `200`:

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "New Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": 0.44
  }
]
```

---

### `GET /health`

Basic health check endpoint.

```json
{ "status": "ok" }
```

---

## Postman

1. Open Postman → Import → select `postman_collection.json`.
2. The collection uses a `{{baseUrl}}` variable defaulting to `http://localhost:5000`.
3. Run **Add School** first to populate data, then **List Schools**.

---

## Deployment

### Render

1. Push the project to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add environment variables under **Environment**.
6. For the database, create a **MySQL** instance (or use PlanetScale / Railway MySQL) and point `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` to it.

### Railway

1. Connect your GitHub repo on [Railway](https://railway.app).
2. Add a **MySQL** plugin — Railway auto-injects `MYSQLHOST`, `MYSQLUSER`, etc.
   Update `config/db.js` to read those variable names if needed, or set your own.
3. Add remaining env vars via the Railway dashboard.
4. Railway auto-detects `npm start` as the run command.
