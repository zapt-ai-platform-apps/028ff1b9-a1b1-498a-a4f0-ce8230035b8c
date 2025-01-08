import React from 'react';

export default function ScheduleForm({ formData, onInputChange, onSubmit, onCancel, loading }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h3 className="text-xl mb-4">Ajouter un enseignement</h3>
        <form onSubmit={onSubmit}>
          <label className="block mb-2">
            Type d'enseignement
            <select
              name="type"
              value={formData.type}
              onChange={onInputChange}
              className="border box-border w-full p-2 mt-1"
              required
            >
              <option value="cours">Cours</option>
              <option value="TD">TD</option>
              <option value="TP.EN">TP.EN</option>
            </select>
          </label>
          <label className="block mb-2">
            Matière
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={onInputChange}
              className="border box-border w-full p-2 mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Nom de l'enseignant
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              onChange={onInputChange}
              className="border box-border w-full p-2 mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Numéro de la salle
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={onInputChange}
              className="border box-border w-full p-2 mt-1"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-4 cursor-pointer w-full"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 mt-2 cursor-pointer w-full"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}