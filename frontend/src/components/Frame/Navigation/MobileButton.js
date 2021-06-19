import React from 'react';

export default function MobileButton(props) {
  return ( 
    <div className="fixed md:hidden ml-1 mt-1 pl-2 pt-2 z-30">
      <button onClick={ props.click } className="-ml-0.5 -mt-0.5 h-8 w-8 border border-gray-100 shadow-lg bg-white inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer">
        <span className="sr-only">Open sidebar</span>
        {/* <!-- Heroicon name: outline/menu --> */}
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
}