import { schedules } from '../../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  const client = postgres(process.env.COCKROACH_DB_URL);
  const db = drizzle(client);

  if (req.method === 'GET') {
    try {
      const user = await authenticateUser(req);
      const result = await db.select().from(schedules).where(eq(schedules.userId, user.id)).limit(10);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const user = await authenticateUser(req);
      const { day, timeSlot, type, subject, teacherName, roomNumber } = req.body;
      const newSchedule = await db.insert(schedules).values({
        day,
        time_slot: timeSlot,
        type,
        subject,
        teacher_name: teacherName,
        room_number: roomNumber,
        user_id: user.id,
      }).returning();
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}