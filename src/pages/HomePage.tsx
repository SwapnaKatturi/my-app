import { useEffect, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUsers } from '../features/users/usersSlice';
import type { RootState, AppDispatch } from '../app/store';

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const userCount = useSelector((state: RootState) => state.users.rows.length);
  const status = useSelector((state: RootState) => state.users.status);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    try {
      await dispatch(createUser({ name, email, company, city })).unwrap();
      setName('');
      setEmail('');
      setCompany('');
      setCity('');
      setShowForm(false);
    } catch (error) {
      setSubmitError((error as Error).message || 'Failed to save user.');
    }
  };

  return (
    <div className="page-section">
      <h1>Home</h1>
      <p>Welcome to the React user dashboard. Use the navigation tabs above to move between pages.</p>
      <p>{userCount} users are currently available.</p>

      <button type="button" className="form-toggle-button" onClick={() => setShowForm((current) => !current)}>
        {showForm ? 'Cancel' : 'Add User'}
      </button>

      {submitError && <p style={{ color: 'red' }}>Error: {submitError}</p>}

      {showForm && (
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              placeholder="Enter company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Enter city"
            />
          </div>

          <button type="submit" className="submit-button">
            Save User
          </button>
        </form>
      )}
    </div>
  );
}

export default HomePage;
