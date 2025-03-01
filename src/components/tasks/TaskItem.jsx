import { format } from 'date-fns';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../../hooks/useTasks';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import TaskForm from './TaskForm';

const TaskItem = ({ task, index }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { deleteTask, refreshTasks } = useTasks();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
        }
    };

    const handleDelete = async () => {
        await deleteTask(task.id);
        setIsDeleteModalOpen(false);
        refreshTasks();
    };

    return (
        <>
            <Draggable draggableId={String(task.id)} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 mb-3 bg-white rounded-lg shadow-sm border-l-4 border-blue-500 dark:bg-gray-800 dark:border-blue-400 ${snapshot.isDragging ? 'shadow-lg' : ''}`}>
                        <div className="flex justify-between items-start">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
                            <div className="flex space-x-2">
                                <button onClick={() => setIsEditModalOpen(true)} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                                <button onClick={() => setIsDeleteModalOpen(true)} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>{task.priority}</span>

                            {task.due_date && (
                                <span className="flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-100">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {format(new Date(task.due_date), 'MMM dd')}
                                </span>
                            )}

                            {task.assignees && task.assignees.length > 0 && (
                                <div className="flex -space-x-2 overflow-hidden">
                                    {task.assignees.map((assignee, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700 border-2 border-white dark:border-gray-800"
                                            title={assignee.name}>
                                            {assignee.name.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Draggable>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task">
                <TaskForm
                    task={task}
                    onSubmit={() => {
                        setIsEditModalOpen(false);
                        refreshTasks();
                    }}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Task">
                <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TaskItem;
