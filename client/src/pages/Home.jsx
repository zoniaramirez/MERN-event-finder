import EventCards from '../components/EventCards';

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen pt-20 px-6 pb-8"> {/* Add padding-top, padding-x, and padding-bottom */}
      <EventCards />
    </main>
  );
};

export default Home;
