

function NotFound () {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white">
      <div className="flex flex-col items-center justify-center text-6xl text-white text-opacity-0 font-ocera font-green-outline">
        <p>404</p>
        <a className="text-sm font-rajdhani hover:text-green-200" href="/">Go Back Home</a>
      </div>
      
    </div>
  )
}

export default NotFound;