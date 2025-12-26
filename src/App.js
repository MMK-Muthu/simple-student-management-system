import { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", age: 20, course: "Computer Science" },
    { id: 2, name: "Priya Patel", age: 19, course: "Data Science" },
    { id: 3, name: "Amit Kumar", age: 21, course: "Web Development" }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Add new student
  const handleAddStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now() // Generate unique ID
    };
    setStudents([...students, newStudent]);
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Edit student
  const handleEditStudent = (id, updatedData) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, ...updatedData, age: parseInt(updatedData.age) }
        : student
    ));
  };

  // Filter students based on search term and filter type
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    
    if (!searchTerm) return true;
    
    switch (filterBy) {
      case 'name':
        return student.name.toLowerCase().includes(searchLower);
      case 'course':
        return student.course.toLowerCase().includes(searchLower);
      default:
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.course.toLowerCase().includes(searchLower) ||
          student.age.toString().includes(searchTerm)
        );
    }
  });

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🎓 Student Management System</h1>
          <p>Manage your students efficiently and effectively</p>
        </div>
      </header>
      
      <main className="app-main">
        <div className="app-container">
          <aside className="sidebar">
            <StudentForm onAddStudent={handleAddStudent} />
          </aside>
          
          <section className="main-content">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterBy={filterBy}
              onFilterChange={setFilterBy}
            />
            <StudentList 
              students={filteredStudents}
              onDelete={handleDeleteStudent}
              onEdit={handleEditStudent}
            />
          </section>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© 2025 Student Management System | Built with React</p>
      </footer>
    </div>
  );
}

export default App;
