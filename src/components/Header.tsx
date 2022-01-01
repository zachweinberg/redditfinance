const Header: React.FunctionComponent = () => {
  return (
    <nav className="sticky top-0 z-50 w-full p-5 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center">
          <img src="/img/logo.png" width={35} className="mr-2" />
          <p className="text-2xl font-bold text-dark">Reddit Finance</p>
        </div>

        <div>
          <a className="p-2 text-base font-semibold transition-colors duration-100 rounded-md cursor-pointer hover:bg-gray-100">
            + Add Subreddit
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
