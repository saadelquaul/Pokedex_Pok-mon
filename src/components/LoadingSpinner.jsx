const LoadingSpinner = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-bounce rounded-full bg-accent ${sizeClasses[size]} ${className}`}
        style={{ animationDelay: '0.1s' }}
      />
      <div 
        className={`animate-bounce rounded-full bg-primary mx-2 ${sizeClasses[size]} ${className}`}
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        className={`animate-bounce rounded-full bg-secondary ${sizeClasses[size]} ${className}`}
        style={{ animationDelay: '0.3s' }}
      />
    </div>
  );
};

export default LoadingSpinner;
