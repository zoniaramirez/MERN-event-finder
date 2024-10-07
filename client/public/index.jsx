const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <h4 className="text-lg">&copy; {new Date().getFullYear()}</h4>
      </div>
    </footer>
  );
};

export default Footer;
