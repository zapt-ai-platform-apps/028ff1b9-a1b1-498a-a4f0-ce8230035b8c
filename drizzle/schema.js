import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const schedules = pgTable('schedules', {
  id: serial('id').primaryKey(),
  day: text('day').notNull(),
  timeSlot: text('time_slot').notNull(),
  type: text('type').notNull(), // 'cours', 'TD', 'TP.EN'
  subject: text('subject').notNull(),
  teacherName: text('teacher_name').notNull(),
  roomNumber: text('room_number').notNull(),
  userId: uuid('user_id').notNull(),
});