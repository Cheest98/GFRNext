async function RightSidebar() {
    return (
        <section className='custom-scrollbar rightsidebar'>
          <div className='flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4'>
            <h3 className='text-heading4-medium text-light-1'>
              Activity
            </h3>
    
            <div className='mt-7 flex w-[350px] flex-col gap-9'>

            </div>
          </div>
    
          <div className='flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4' >
            <h3 className='text-heading4-medium text-light-1'>Users</h3>
            <div className='mt-7 flex w-[350px] flex-col gap-10'>
            </div>
          </div>
        </section>
      );
    }
export default RightSidebar;