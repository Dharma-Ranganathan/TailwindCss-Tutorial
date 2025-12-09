import Body from "./components/Body"
import Header from "./components/Header"

const App = () => {
  return (
    <div className="w-full h-screen bg-[#101720] overflow-y-scroll scroll-smooth">
      <Header/>
      <Body/>
    </div>
  )
}

export default App
