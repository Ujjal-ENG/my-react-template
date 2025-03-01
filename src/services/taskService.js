import api from './api';

export const getTasks = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    
    if (filters.dueDate) {
      params.append('due_date', filters.dueDate);
    }
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
  }
};

export const getTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create task');
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update task');
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete task');
  }
};

export const reorderTasks = async (taskIdsInOrder) => {
  try {
    const response = await api.post('/tasks/reorder', { tasks: taskIdsInOrder });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reorder tasks');
  }
};

export const bulkUpdateTasks = async (taskIds, updateData) => {
  try {
    const response = await api.put('/tasks/bulk', { 
      task_ids: taskIds,
      ...updateData
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to bulk update tasks');
  }
};

export const getTaskActivity = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}/activities`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task activities');
  }
};

export const getTasksReport = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) {
      params.append('start_date', filters.startDate);
    }
    
    if (filters.endDate) {
      params.append('end_date', filters.endDate);
    }
    
    const response = await api.get(`/tasks/report?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks report');
  }
};

export const downloadTasksReport = async (format = 'csv', filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    params.append('format', format);
    
    if (filters.startDate) {
      params.append('start_date', filters.startDate);
    }
    
    if (filters.endDate) {
      params.append('end_date', filters.endDate);
    }
    
    const response = await api.get(`/tasks/report/download?${params.toString()}`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tasks-report.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to download tasks report');
  }
};