import React from 'react'

export const Header = () => {
    return (
        <div> 
            {/* 🔹 Header Bar */}
            <div className="bg-gray-100 text-gray-600 text-sm text-center py-3 px-4">
                🎉 Get <span className="font-semibold">10% OFF</span> on your first order — Use code{" "}
                <span className="font-bold tracking-wide">WELCOME10</span>
            </div>
        </div>
    )
}
