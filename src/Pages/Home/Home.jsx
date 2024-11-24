import Banner from "../../Components/Banner/Banner";
import UsersSection from "../../Components/UsersSection/UsersSection";

const Home = () => {
  return (
    <div className=" mx-auto p-5 md:p-0">
      <Banner></Banner>
      <UsersSection></UsersSection>
    </div>
  );
};

export default Home;
