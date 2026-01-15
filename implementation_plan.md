# Serve-U Implementation Plan

## 1. Overview
Serve-U is a service marketplace connecting consumers with skilled workers (plumbers, electricians, etc.). The platform supports a unified user account system where users can switch between "Consumer" and "Worker" roles.

## 2. Technology Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Server Actions/Route Handlers)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Custom JWT or NextAuth.js (Implementation pending selection, schema assumes custom for now)
- **State Management:** React Context (UserProvider, WorkerProvider) + SWR/React Query

## 3. Database Schema (Prisma)
The schema (`web-app/prisma/schema.prisma`) has been created with:
- **`User`**: Central identity with `isUserSignUpForWorker` flag.
- **`WorkerProfile`**: 1:1 relation for worker-specific data (bio, exp, portfolio).
- **`ServiceRequest`**: Core transaction model.
- **`AppConfig`**: Dynamic commission settings.

## 4. Feature Division & Implementation Phases

### Phase 1: Infrastructure & Backend Setup
- [x] Initialize Next.js project
- [x] Setup Tailwind CSS
- [x] Install Prisma & Define Schema
- [ ] **Action:** Run `prisma migrate dev` to create DB tables.
- [ ] **Action:** Create `lib/prisma.ts` for singleton client.
- [ ] **Action:** Seed database with initial Categories (Plumber, Electrician) and SuperAdmin.

### Phase 2: Authentication & User Profiles
- [ ] **API:** `POST /api/register` (Handle generic user signup)
- [ ] **API:** `POST /api/login`
- [ ] **UI:** `(auth)/login/page.tsx` - Update to support generic User login.
- [ ] **UI:** `(auth)/register/page.tsx` - Add basic fields.
- [ ] **UI:** `(user)/dashboard/profile` - Add "Become a Worker" toggle/flow.
    - If toggled ON -> Create `WorkerProfile` entry.

### Phase 3: Worker Onboarding (The "Checklist")
- [ ] **Middleware:** Protect worker routes.
- [ ] **UI:** `(worker)/onboarding/page.tsx`
    - Step 1: Personal ID Verification (Upload ID Card).
    - Step 2: Professional Details (Bio, Experience).
    - Step 3: Select Categories (Max 3).
    - Step 4: Add Portfolio Items.
- [ ] **Backend:** API endpoints to update `WorkerProfile`.

### Phase 4: Service Discovery (Consumer View)
- [ ] **UI:** `(site)/page.tsx` (Landing) - Update Hero to "Find a Service".
- [ ] **UI:** `(site)/search/page.tsx` - Filter workers by Category & Location.
- [ ] **UI:** `(site)/worker/[id]/page.tsx` - Public worker profile view.

### Phase 5: Request & Booking Flow
- [ ] **UI:** Booking Modal/Page on Worker Profile.
- [ ] **Backend:** `POST /api/requests` - Create `ServiceRequest`.
- [ ] **UI:** `(user)/dashboard/requests` - List active/past requests.
- [ ] **UI:** `(worker)/dashboard/jobs` - Worker view of incoming requests (Accept/Reject).

### Phase 6: Payments & Commission
- [ ] **Backend:** Calculate commission based on `AppConfig`.
- [ ] **Integration:** Stripe/Payment Gateway for "In-App" payments.
- [ ] **Logic:** Handle "COD" status updates (Worker marks as paid).

### Phase 7: Admin Panel
- [ ] **UI:** `(admin)/dashboard` - Metrics (Total Users, Active Jobs).
- [ ] **UI:** `(admin)/categories` - CRUD for Service Categories.
- [ ] **UI:** `(admin)/configuration` - Update Commission Rates.

## 5. Next Steps
1.  Configure `.env` with your PostgreSQL `DATABASE_URL`.
2.  Run migration: `npx prisma migrate dev --name init`.
3.  Begin Phase 2 (Auth Implementation).