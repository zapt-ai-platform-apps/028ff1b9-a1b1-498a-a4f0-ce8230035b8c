CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "day" TEXT NOT NULL,
  "time_slot" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "teacher_name" TEXT NOT NULL,
  "room_number" TEXT NOT NULL,
  "user_id" UUID NOT NULL
);