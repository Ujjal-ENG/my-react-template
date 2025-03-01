/**
 * Collection of validation functions for the Task Management System
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Object with validity status and potential error message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Validate task input data
 * @param {Object} taskData - Task data to validate
 * @returns {Object} Object containing validation results with any error messages
 */
export const validateTaskInput = (taskData) => {
  const errors = {};
  
  // Title validation
  if (!taskData.title || taskData.title.trim() === '') {
    errors.title = 'Task title is required';
  } else if (taskData.title.length > 100) {
    errors.title = 'Task title cannot exceed 100 characters';
  }
  
  // Description length validation (if provided)
  if (taskData.description && taskData.description.length > 1000) {
    errors.description = 'Description cannot exceed 1000 characters';
  }
  
  // Due date validation
  if (taskData.due_date) {
    const dueDate = new Date(taskData.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(dueDate.getTime())) {
      errors.due_date = 'Invalid date format';
    } else if (dueDate < today) {
      errors.due_date = 'Due date cannot be in the past';
    }
  }
  
  // Status validation
  const validStatuses = ['todo', 'in_progress', 'review', 'completed', 'cancelled'];
  if (taskData.status && !validStatuses.includes(taskData.status.toLowerCase())) {
    errors.status = 'Invalid status value';
  }
  
  // Priority validation
  const validPriorities = ['low', 'medium', 'high'];
  if (taskData.priority && !validPriorities.includes(taskData.priority.toLowerCase())) {
    errors.priority = 'Invalid priority value';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate user registration input
 * @param {Object} userData - User registration data
 * @returns {Object} Object containing validation results with any error messages
 */
export const validateUserRegistration = (userData) => {
  const errors = {};
  
  // Name validation
  if (!userData.name || userData.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  // Email validation
  if (!userData.email || userData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(userData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
  }
  
  // Password confirmation validation
  if (userData.password !== userData.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate login input
 * @param {Object} loginData - Login credentials
 * @returns {Object} Object containing validation results with any error messages
 */
export const validateLoginInput = (loginData) => {
  const errors = {};
  
  // Email validation
  if (!loginData.email || loginData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(loginData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!loginData.password || loginData.password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};