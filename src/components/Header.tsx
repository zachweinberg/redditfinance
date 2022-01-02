import Link from 'next/link'

const Header: React.FunctionComponent = () => {
  return (
    <nav className="sticky top-0 z-50 w-full p-5 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/">
          <a className="flex items-center hover:opacity-80">
            <img src="/img/logo.png" className="w-6 mr-2 md:w-12" />
            <p className="font-bold md:text-2xl text-dark">Reddit Finance</p>
          </a>
        </Link>

        <div>
          <Link href="/add">
            <a className="p-2 text-sm font-semibold transition-colors duration-100 rounded-md cursor-pointer md:text-base hover:bg-gray-100">
              + Add subreddit
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
