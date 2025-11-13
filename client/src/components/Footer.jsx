const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center mt-12 text-gray-400">
      <p className="text-lg font-medium mb-2">WebPify</p>
      <p className="text-sm">© {currentYear} WebPify. All rights reserved.</p>
    </div>
  );
};

export default Footer;
