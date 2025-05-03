// components/LoadingSpinner.js
"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true); // Start loading when the component mounts

    const handleComplete = () => setLoading(false);

    // Simulate route change detection
    handleComplete();

    return () => {
      setLoading(false); // Cleanup on unmount
    };
  }, [pathname, searchParams]); // Trigger effect on route changes

  if (!loading) return null;

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <style jsx>{`
        .loading-spinner {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
