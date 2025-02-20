import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const { email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    register({ email, password, role });
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <select name='role' value={role} onChange={onChange}>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
