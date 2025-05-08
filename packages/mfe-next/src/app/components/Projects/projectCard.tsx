import React from 'react';

export function projectCard<P extends object>(WrappedComponent: React.ComponentType<P>, hoverClasses: string) {
  const Component: React.FC<P> = (props) => (
    <div className={`bg-gray-800 rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-102 ${hoverClasses}`}>  
      <WrappedComponent {...props} />
    </div>
  );
  return Component;
} 