import { useState } from "react";

const StudentForm = ({ onAddStudent }) => {
  const [studentDetail, setStudentDetail] = useState({
    name: "",
    age: "",
    course: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!studentDetail.name.trim()) {
      newErrors.name = "Name is required";
    } else if (studentDetail.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!studentDetail.age) {
      newErrors.age = "Age is required";
    } else if (studentDetail.age < 1 || studentDetail.age > 100) {
      newErrors.age = "Age must be between 1 and 100";
    }

    if (!studentDetail.course.trim()) {
      newErrors.course = "Course is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a brief submission delay for UX
    setTimeout(() => {
      onAddStudent({
        name: studentDetail.name.trim(),
        age: parseInt(studentDetail.age),
        course: studentDetail.course.trim()
      });
      
      // Reset form
      setStudentDetail({
        name: "",
        age: "",
        course: ""
      });
      setErrors({});
      setIsSubmitting(false);
    }, 300);
  };

  const handleChange = (field, value) => {
    setStudentDetail({ ...studentDetail, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="student-form-container">
      <div className="form-header">
        <h2>➕ Add New Student</h2>
        <p>Fill in the details below to register a new student</p>
      </div>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">
            <span className="label-icon">👤</span>
            Student Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter student name"
            value={studentDetail.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className={`form-group ${errors.age ? 'has-error' : ''}`}>
          <label htmlFor="age">
            <span className="label-icon">🎂</span>
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter age"
            value={studentDetail.age}
            onChange={(e) => handleChange('age', e.target.value)}
            min="1"
            max="100"
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>
        
        <div className={`form-group ${errors.course ? 'has-error' : ''}`}>
          <label htmlFor="course">
            <span className="label-icon">📚</span>
            Course
          </label>
          <input
            type="text"
            id="course"
            placeholder="Enter course name"
            value={studentDetail.course}
            onChange={(e) => handleChange('course', e.target.value)}
          />
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>
        
        <button 
          type="submit" 
          className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Adding...' : '✅ Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
