import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SubmitComplaint = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        phone: '',
        complaint: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (values) => {
        const errors = {};
        
        if (!values.firstName) errors.firstName = 'First Name is required';
        if (!values.lastName) errors.lastName = 'Last Name is required';
        
        if (!values.username) {
            errors.username = 'Username is required';
        } else {
            const existingData = JSON.parse(localStorage.getItem('complaints') || '[]');
            const isDuplicate = existingData.some(c => c.username === values.username);
            if (isDuplicate) errors.username = 'Username already exists';
        }

        if (!values.location) errors.location = 'Location is required';

        if (!values.phone) {
            errors.phone = 'Phone Number is required';
        } else if (!/^[0-9]+$/.test(values.phone)) {
            errors.phone = 'Must be only digits';
        } else if (values.phone.length < 10) {
            errors.phone = 'Must be at least 10 digits';
        } else if (values.phone.length > 15) {
            errors.phone = 'Must be 15 digits or less';
        }

        if (!values.complaint) {
            errors.complaint = 'Detailed Complaint is required';
        } else if (values.complaint.length < 20) {
            errors.complaint = 'Complaint must be at least 20 characters';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const existingData = JSON.parse(localStorage.getItem('complaints') || '[]');
            const newComplaint = {
                id: Date.now(),
                ...values,
                date: new Date().toLocaleDateString()
            };
            
            localStorage.setItem('complaints', JSON.stringify([...existingData, newComplaint]));
            navigate('/complaints');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="container">
            <nav className="nav">
                <Link to="/" className="active">Submit Complaint</Link>
                <Link to="/complaints">View Complaints</Link>
            </nav>
            <div className="card">
                <h1>Submit a Complaint</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                            <div className="error-msg">{errors.firstName}</div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <div className="error-msg">{errors.lastName}</div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Choose a unique username"
                        />
                        {errors.username && (
                            <div className="error-msg">{errors.username}</div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                            placeholder="Where did this happen?"
                        />
                        {errors.location && (
                            <div className="error-msg">{errors.location}</div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            placeholder="e.g. 1234567890"
                        />
                        {errors.phone && (
                            <div className="error-msg">{errors.phone}</div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="complaint">Detailed Complaint</label>
                        <textarea
                            id="complaint"
                            name="complaint"
                            rows="5"
                            value={values.complaint}
                            onChange={handleChange}
                            placeholder="Describe your issue in detail..."
                        />
                        {errors.complaint && (
                            <div className="error-msg">{errors.complaint}</div>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;
