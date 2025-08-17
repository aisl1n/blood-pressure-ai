import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

const Home = async () => {
  return (
    <>
      <Header />
      <div className="flex h-svw flex-col items-center justify-center">
        <h1>Menu inicial de medição arterial</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
