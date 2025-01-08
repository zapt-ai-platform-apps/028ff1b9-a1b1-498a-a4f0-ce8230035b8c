import React from 'react';

export default function ScheduleGrid({ schedules, onSlotClick }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
        <div key={day}>
          <h3 className="text-xl">{day}</h3>
          {['Morning', 'Afternoon', 'Evening'].map(time => (
            <div
              key={time}
              className="border p-2 cursor-pointer box-border"
              onClick={() => onSlotClick(day, time)}
            >
              {schedules.find(s => s.day === day && s.timeSlot === time) ? 'Booked' : time}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}