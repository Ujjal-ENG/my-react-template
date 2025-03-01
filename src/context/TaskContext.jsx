import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: 'all', dueDate: null });

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            const tasksData = await getTasks(filters);
            setTasks(tasksData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleCreateTask = async (taskData) => {
        try {
            setLoading(true);
            const newTask = await createTask(taskData);
            setTasks([...tasks, newTask]);
            return newTask;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            setLoading(true);
            const updatedTask = await updateTask(id, taskData);
            setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
            return updatedTask;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            setLoading(true);
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleReorderTasks = async (reorderedTasks) => {
        setTasks(reorderedTasks);
        // Implement API call to update order in the backend
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                filters,
                setFilters,
                createTask: handleCreateTask,
                updateTask: handleUpdateTask,
                deleteTask: handleDeleteTask,
                reorderTasks: handleReorderTasks,
                refreshTasks: loadTasks
            }}>
            {children}
        </TaskContext.Provider>
    );
};
