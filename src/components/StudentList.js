import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students, onDelete, onEdit }) => {
  if (students.length === 0) {
    return (
      <div className="student-list-empty">
        <div className="empty-icon">📋</div>
        <h3>No Students Found</h3>
        <p>Add a new student or adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <h2>Student Directory</h2>
        <span className="student-count">{students.length} student{students.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="students-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
