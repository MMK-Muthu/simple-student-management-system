import React, { useState } from 'react';

const StudentCard = ({ student, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: student.name,
    age: student.age,
    course: student.course
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(student.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: student.name,
      age: student.age,
      course: student.course
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="student-card editing">
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              required
              min="1"
              max="100"
            />
          </div>
          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              value={editData.course}
              onChange={(e) => setEditData({ ...editData, course: e.target.value })}
              required
            />
          </div>
          <div className="edit-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="student-avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="student-id">#{student.id}</div>
      </div>
      <div className="card-body">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-info">
          <div className="info-item">
            <span className="info-icon">🎂</span>
            <span className="info-label">Age:</span>
            <span className="info-value">{student.age} years</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📚</span>
            <span className="info-label">Course:</span>
            <span className="info-value">{student.course}</span>
          </div>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(student.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;

