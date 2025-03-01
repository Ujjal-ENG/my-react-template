/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {string} format - The format to use (short, medium, long)
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const options = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Format task status for display
 * @param {string} status - The status code from API
 * @returns {string} - Formatted status string
 */
export const formatTaskStatus = (status) => {
  const statusMap = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'completed': 'Completed'
  };
  
  return statusMap[status] || status;
};

/**
 * Format task priority for display
 * @param {string} priority - The priority code from API
 * @returns {string} - Formatted priority string
 */
export const formatTaskPriority = (priority) => {
  const priorityMap = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High'
  };
  
  return priorityMap[priority] || priority;
};

/**
 * Get color class for priority
 * @param {string} priority - The priority level
 * @returns {string} - CSS class for the priority
 */
export const getPriorityColorClass = (priority) => {
  const colorMap = {
    'high': 'text-red-600 dark:text-red-400',
    'medium': 'text-yellow-600 dark:text-yellow-400',
    'low': 'text-green-600 dark:text-green-400'
  };
  
  return colorMap[priority] || '';
};

/**
 * Get background color class for status
 * @param {string} status - The status code
 * @returns {string} - CSS class for the status
 */
export const getStatusColorClass = (status) => {
  const colorMap = {
    'todo': 'bg-gray-100 dark:bg-gray-700',
    'in_progress': 'bg-blue-100 dark:bg-blue-700',
    'completed': 'bg-green-100 dark:bg-green-700'
  };
  
  return colorMap[status] || '';
};

/**
 * Format relative time (e.g., "2 days ago")
 * @param {string|Date} date - The date to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};