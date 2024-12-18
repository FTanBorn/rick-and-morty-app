export default function Loading() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-center mb-8'>Rick and Morty Characters</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='bg-white rounded-lg shadow-lg overflow-hidden animate-pulse'>
              <div className='h-64 bg-gray-300' />
              <div className='p-4 space-y-4'>
                <div className='h-4 bg-gray-300 rounded w-3/4' />
                <div className='h-4 bg-gray-300 rounded w-1/2' />
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-300 rounded w-5/6' />
                  <div className='h-4 bg-gray-300 rounded w-4/6' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
