import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} required />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} required />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
