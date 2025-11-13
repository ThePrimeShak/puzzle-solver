import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Puzzle from "@/components/puzzle/Puzzle";

const App = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Puzzle />
      </main>
      <Footer />
    </div>
  );
};

export default App;
