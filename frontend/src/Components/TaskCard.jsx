import React from "react";
import { FiEdit2, FiTrash2, FiCalendar, FiFlag } from "react-icons/fi";

const TaskCard = ({ task, onEdit, onDelete }) => {
  if (!task) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-black rounded-2xl p-4 sm:p-6 flex flex-col gap-3 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 focus-within:ring-[#aff901] focus-within:ring-offset-2 outline-none">
      {/* Task Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg sm:text-xl font-bold text-[#aff901] flex-1 pr-2">
          {task.title}
        </h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-[#aff901] text-black hover:opacity-80 transition"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <FiEdit2 className="text-sm" />
          </button>
          <button
            className="p-2 rounded-full bg-red-500 text-white hover:opacity-80 transition"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <FiTrash2 className="text-sm" />
          </button>
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-white text-sm leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Task Details */}
      <div className="space-y-2">
        {/* Dates */}
        <div className="flex items-center gap-2 text-white text-xs">
          <FiCalendar className="text-[#aff901]" />
          <span>Start: {formatDate(task.start_date)}</span>
          {task.end_date && (
            <>
              <span>•</span>
              <span>End: {formatDate(task.end_date)}</span>
            </>
          )}
        </div>

        {/* Priority and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiFlag className={`text-sm ${getPriorityColor(task.priority)}`} />
            <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)} Priority
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(task.status)} bg-opacity-20`}>
            {task.status?.replace('_', ' ').charAt(0).toUpperCase() + task.status?.replace('_', ' ').slice(1)}
          </span>
        </div>

        {/* Created Date */}
        {task.created_at && (
          <div className="text-white text-xs opacity-70">
            Created: {formatDate(task.created_at)}
          </div>
        )}
      </div>

      {/* Progress Bar for Status */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            task.status === 'completed' ? 'bg-green-500 w-full' :
            task.status === 'in_progress' ? 'bg-blue-500 w-2/3' :
            task.status === 'pending' ? 'bg-yellow-500 w-1/3' :
            'bg-gray-500 w-0'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default TaskCard;
