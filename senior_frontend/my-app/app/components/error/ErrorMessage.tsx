"use client";

import React from 'react';

interface ErrorMessageProps {
    error: null | string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    return (
        <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
        </div>
    );
};

export default ErrorMessage;
