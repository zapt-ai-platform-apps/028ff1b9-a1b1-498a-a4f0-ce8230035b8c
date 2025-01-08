import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ScheduleGrid from './ScheduleGrid';
import ScheduleForm from './ScheduleForm';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    day: '',
    timeSlot: '',
    type: 'cours',
    subject: '',
    teacherName: '',
    roomNumber: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchSchedules();
      } else if (event === 'SIGNED_OUT') {
        setSchedules([]);
      }
    });
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('schedules').select('*');
    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data);
    }
    setLoading(false);
  };

  const handleSlotClick = (day, timeSlot) => {
    setSelectedSlot({ day, timeSlot });
    setFormData({
      day,
      timeSlot,
      type: 'cours',
      subject: '',
      teacherName: '',
      roomNumber: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    const response = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.session?.access_token}`,
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchSchedules();
      setSelectedSlot(null);
    } else {
      console.error('Error adding schedule');
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-4">
      <h2 className="text-2xl mb-4">Emploi du temps</h2>
      {loading && <p>Loading...</p>}
      <ScheduleGrid schedules={schedules} onSlotClick={handleSlotClick} />
      {selectedSlot && (
        <ScheduleForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedSlot(null)}
          loading={loading}
        />
      )}
    </div>
  );
}