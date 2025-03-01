import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTasks } from '../../hooks/useTasks';
import Card, { CardBody, CardHeader } from '../ui/Card';
import TaskItem from './TaskItem';

const TaskDragDrop = () => {
    const { tasks, loading, error, reorderTasks } = useTasks();

    // Group tasks by status
    const taskGroups = {
        todo: tasks.filter((task) => task.status === 'todo'),
        inProgress: tasks.filter((task) => task.status === 'in_progress'),
        completed: tasks.filter((task) => task.status === 'completed')
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        // Create a copy of task groups
        const newTaskGroups = { ...taskGroups };

        // If dropped in the same list but different position
        if (source.droppableId === destination.droppableId) {
            const list = Array.from(newTaskGroups[source.droppableId]);
            const [removed] = list.splice(source.index, 1);
            list.splice(destination.index, 0, removed);

            newTaskGroups[source.droppableId] = list;

            // Update task order in backend
            reorderTasks(
                source.droppableId,
                list.map((task) => task.id)
            );
        }
        // If dropped in a different list
        else {
            const sourceList = Array.from(newTaskGroups[source.droppableId]);
            const destList = Array.from(newTaskGroups[destination.droppableId]);
            const [removed] = sourceList.splice(source.index, 1);

            // Update task status based on destination
            const updatedTask = {
                ...removed,
                status: destination.droppableId === 'inProgress' ? 'in_progress' : destination.droppableId
            };

            destList.splice(destination.index, 0, updatedTask);

            newTaskGroups[source.droppableId] = sourceList;
            newTaskGroups[destination.droppableId] = destList;

            // Update task status in backend
            reorderTasks(
                destination.droppableId,
                destList.map((task) => task.id),
                updatedTask.id,
                updatedTask.status
            );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="p-4 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">Error: {error}</div>;
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Todo Column */}
                <Card>
                    <CardHeader className="bg-gray-100 dark:bg-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">To Do</h3>
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full dark:bg-gray-600 dark:text-gray-200">{taskGroups.todo.length}</span>
                    </CardHeader>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <CardBody ref={provided.innerRef} {...provided.droppableProps} className="min-h-[20rem]">
                                {taskGroups.todo.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">No tasks</div>
                                ) : (
                                    taskGroups.todo.map((task, index) => <TaskItem key={task.id} task={task} index={index} />)
                                )}
                                {provided.placeholder}
                            </CardBody>
                        )}
                    </Droppable>
                </Card>

                {/* In Progress Column */}
                <Card>
                    <CardHeader className="bg-blue-100 dark:bg-blue-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">In Progress</h3>
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded-full dark:bg-blue-700 dark:text-blue-100">{taskGroups.inProgress.length}</span>
                    </CardHeader>
                    <Droppable droppableId="inProgress">
                        {(provided) => (
                            <CardBody ref={provided.innerRef} {...provided.droppableProps} className="min-h-[20rem]">
                                {taskGroups.inProgress.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">No tasks in progress</div>
                                ) : (
                                    taskGroups.inProgress.map((task, index) => <TaskItem key={task.id} task={task} index={index} />)
                                )}
                                {provided.placeholder}
                            </CardBody>
                        )}
                    </Droppable>
                </Card>

                {/* Completed Column */}
                <Card>
                    <CardHeader className="bg-green-100 dark:bg-green-900">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Completed</h3>
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-200 text-green-800 rounded-full dark:bg-green-700 dark:text-green-100">{taskGroups.completed.length}</span>
                    </CardHeader>
                    <Droppable droppableId="completed">
                        {(provided) => (
                            <CardBody ref={provided.innerRef} {...provided.droppableProps} className="min-h-[20rem]">
                                {taskGroups.completed.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">No completed tasks</div>
                                ) : (
                                    taskGroups.completed.map((task, index) => <TaskItem key={task.id} task={task} index={index} />)
                                )}
                                {provided.placeholder}
                            </CardBody>
                        )}
                    </Droppable>
                </Card>
            </div>
        </DragDropContext>
    );
};

export default TaskDragDrop;
