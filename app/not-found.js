import React from 'react';
import Link from 'next/link'; 
import ErrorPage from './pages/errorPage/ErrorPage';
import OuterContainer from './components/common/OuterContainer';

function NotFoundPage() {
  return (
      <OuterContainer>
        <div className='flex flex-col items-center justify-center'>
          <ErrorPage/>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors inline-block"
        >
          Go Home
        </Link>
        </div>
      </OuterContainer>
  );
}

export default NotFoundPage;



