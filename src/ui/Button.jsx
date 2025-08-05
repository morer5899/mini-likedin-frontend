import React from 'react'
import { memo } from 'react'

const Button = ({type,loading,initialText,loadingText,onClick}) => {
  return (
    <>
    <button
            type={type}
            className={`w-full py-2 rounded-md transition flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
            onClick={onClick}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                {loadingText}
              </>
            ) : (
              `${initialText}`
            )}
          </button>
    </>
  )
}

export default memo(Button)