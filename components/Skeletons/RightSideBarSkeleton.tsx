import React from "react";

const RightSidebarSkeleton = () => {
  return (
    <section className="custom-scrollbar rightsidebar"> {/* Increased width */}
      <div className="flex flex-1 flex-col justify-start bg-dark-2 rounded-lg p-6 animate-pulse w-200"> {/* Increased padding */}
        <h3 className="h-8 w-40 bg-gray-600 rounded"></h3> {/* Adjusted size */}
        <div className="mt-5 space-y-5"> {/* Increased spacing */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4"> {/* Increased spacing */}
              <div className="h-12 w-12 bg-gray-600 rounded-full"></div> {/* Increased size */}
              <div className="flex-1">
                <div className="h-6 w-4/5 bg-gray-600 rounded"></div> {/* Adjusted size */}
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start bg-dark-2 rounded-lg p-6 animate-pulse mt-5"> {/* Increased padding */}
        <h3 className="h-8 w-40 bg-gray-600 rounded"></h3> {/* Adjusted size */}
        <div className="mt-5 space-y-5"> {/* Increased spacing */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 w-full bg-gray-600 rounded"></div> 
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebarSkeleton;