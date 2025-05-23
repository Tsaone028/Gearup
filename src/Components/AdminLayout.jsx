// src/components/AdminLayout.jsx
import React from 'react';
import './AdminLayout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const CoursesSidebar = ({ onMenuSelect }) => (
  <>
    <h3>Training Content</h3>
    <ul>
      <li onClick={() => onMenuSelect('upload')}>Upload Video</li>
      <li onClick={() => onMenuSelect('assign')}>Assign Department</li>
    </ul>
    <h3>Manage Course Materials</h3>
    <ul>
      <li onClick={() => onMenuSelect('materials')}>Edit / Replace Files</li>
      <li onClick={() => onMenuSelect('resources')}>Add Resources</li>
    </ul>
    <h3>Course Settings</h3>
    <ul>
      <li onClick={() => onMenuSelect('settings')}>Course Title & Info</li>
      <li onClick={() => onMenuSelect('completion')}>Completion Rules</li>
    </ul>
  </>
);

const AssessmentsSidebar = ({ onMenuSelect }) => (
  <>
    <h3>Assessments</h3>
    <ul>
      <li onClick={() => onMenuSelect('create')}>Create Assessment</li>
      <li onClick={() => onMenuSelect('assign')}>Assign to Course</li>
      <li onClick={() => onMenuSelect('manage')}>Manage Questions</li>
    </ul>
  </>
);

const EmployeesSidebar = ({ onMenuSelect }) => (
  <>
    <h3>Employees</h3>
    <ul>
      <li onClick={() => onMenuSelect('add')}>Add Employee</li>
      <li onClick={() => onMenuSelect('manage')}>Manage Employees</li>
      <li onClick={() => onMenuSelect('edit')}>Edit Info</li>
    </ul>
  </>
);

const AdminLayout = ({ children, onMenuSelect }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear session/auth logic here
    navigate('/');
  };

  let sidebar = null;
  if (location.pathname.startsWith('/admin/courses')) {
    sidebar = <CoursesSidebar onMenuSelect={onMenuSelect} />;
  } else if (location.pathname.startsWith('/admin/assessments')) {
    sidebar = <AssessmentsSidebar onMenuSelect={onMenuSelect} />;
  } else if (location.pathname.startsWith('/admin/employees')) {
    sidebar = <EmployeesSidebar onMenuSelect={onMenuSelect} />;
  }

  return (
    <div className="admin-layout">
      <header className="admin-navbar">
        <div className="admin-navbar-left">
          <div className="logo">GearUp Admin</div>
        </div>
        <div className="admin-navbar-right">
          <nav className="admin-nav">
            <Link to="/admin/courses">Courses</Link>
            <Link to="/admin/assessments">Assessments</Link>
            <Link to="/admin/employees">Employees</Link>
            <Link to="/admin/reports">Certifications</Link>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        {sidebar && <aside className="admin-sidebar">{sidebar}</aside>}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
