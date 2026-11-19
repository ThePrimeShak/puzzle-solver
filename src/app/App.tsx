import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Puzzle from "@/features/puzzle/components/Puzzle";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Puzzle />
      </main>
      <Footer />
    </div>
  );
};

export default App;
