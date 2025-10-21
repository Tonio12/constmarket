# CraftConnect Frontend-Backend Integration Guide

## Overview

The CraftConnect frontend is now fully integrated with the backend API for user authentication and signup.

## Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd craftconnect-backend
   ```

2. Ensure your `.env` file is configured with your Neon database URL:

   ```env
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_secret_key
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   ```

3. Push the database schema:

   ```bash
   npm run db:push
   ```

4. Seed initial data:

   ```bash
   npm run db:seed
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The API will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd craftconnect
   ```

2. Create a `.env.local` file with the API URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## Features Implemented

### 1. Multi-Step Signup Flow

The signup process follows this flow:

1. **Role Selection** - User selects either "Contractor" or "Artisan"
2. **Signup Form** - User enters personal information and credentials
3. **Skills Selection** (Artisans only) - Artisans add their skills
4. **Final Submission** - Data is sent to the backend API

### 2. API Integration

**API Service Location**: `craftconnect/src/lib/api/auth.ts`

Available methods:

- `authApi.signup(data)` - Register a new user
- `authApi.login(data)` - Authenticate existing user
- `authApi.getProfile()` - Fetch user profile
- `authApi.logout()` - Clear authentication tokens
- `authApi.isAuthenticated()` - Check if user is logged in

### 3. Authentication Flow

1. User completes the multi-step signup form
2. Frontend validates all required fields
3. Data is sent to `POST /api/auth/signup`
4. Backend validates, hashes password, and creates user in database
5. JWT token is returned and stored in localStorage
6. User is redirected to the home page

### 4. State Management

- Local component state manages form data through the signup flow
- Parent `MultiStepSignup` component orchestrates the entire process
- Form data is accumulated and sent to the API only at the end

## API Endpoints

### Signup

```typescript
POST /api/auth/signup
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "securepassword123",
  "userType": "artisan",
  "profile": {
    "firstName": "John",
    "surname": "Doe",
    "specialties": ["masonry", "carpentry"],
    "skills": ["brick laying", "concrete work"],
    "experience": 5,
    "bio": "Experienced mason"
  },
  "contactInfo": {
    "phone": "+233123456789",
    "email": "user@example.com",
    "location": "Accra, Ghana"
  },
  "preferences": {
    "emailUpdates": true,
    "termsAccepted": true
  }
}

Response (Success):
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token_here"
  }
}
```

### Login

```typescript
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token_here"
  }
}
```

### Get Profile

```typescript
GET /api/auth/profile
Authorization: Bearer <token>

Response (Success):
{
  "success": true,
  "data": {
    "user": { /* user object */ }
  }
}
```

## Component Structure

```
craftconnect/src/components/auth/
├── MultiStepSignup.tsx      # Main orchestrator component
├── RoleSelection.tsx         # Step 1: Role selection
├── SignupForm.tsx            # Step 2: User credentials
└── SkillsSelection.tsx       # Step 3: Skills (artisans only)
```

## Data Flow

```
User Input → Local State → Parent State → API Service → Backend → Database
                                                ↓
                                          JWT Token
                                                ↓
                                          localStorage
                                                ↓
                                          Redirect
```

## Error Handling

- Form validation errors are shown inline
- API errors are displayed at the top of the page
- Loading states prevent multiple submissions
- All errors are user-friendly and actionable

## Testing the Integration

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000/signup`
3. Complete the signup flow:
   - Select a role (Contractor or Artisan)
   - Fill in the signup form
   - (If artisan) Add skills
   - Submit the form
4. Check the browser console for API responses
5. Verify the user was created in the database

## Next Steps

- Implement login page UI
- Create protected routes using the authentication token
- Build user dashboard
- Add profile editing functionality
- Implement password reset flow

