import React, { useState } from 'react';

const ResetPasswordForm = () => {
 const [formData, setFormData] = useState({ email: '' });

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we can send the email to your back-end server to reset the user's password
    console.log('Email submitted:', formData.email);
 };

 return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <button type="submit">Reset Password</button>
    </form>
 );
};

export default ResetPasswordForm;