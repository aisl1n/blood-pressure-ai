import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";

import { BloodPressureCard } from "../components/blood-pressure-card/";

const Home = async () => {
  const bloodPressures = await db.query.bloodPressureRecordTable.findMany();
  return (
    <>
      <Header />
      <div className="mx-4 flex flex-col items-center justify-center gap-4">
        {bloodPressures.map(bp => (
          <BloodPressureCard key={bp.id} bp={bp} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
