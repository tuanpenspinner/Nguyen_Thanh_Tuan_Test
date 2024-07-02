import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEditEmployee from './pages/CreateEditEmployee/CreateEditEmployee';
import ListEmployees from './pages/ListEmployee/ListEmployees';
import './styles/styles.scss';

const App: React.FC = () => (
  <div className="main">
    <Router>
      <Routes>
        <Route path="/" Component={ListEmployees} />
        <Route path="/create" Component={CreateEditEmployee} />
        <Route
          path="/edit/:id"
          Component={() => <CreateEditEmployee isEdit />}
        />
      </Routes>
    </Router>
  </div>
);

export default App;
