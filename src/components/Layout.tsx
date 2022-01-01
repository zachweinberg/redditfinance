import Header from './Header'

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto">{children}</main>
    </>
  )
}

export default Layout
