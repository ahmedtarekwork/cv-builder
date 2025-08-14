const Footer = () => {
  return (
    <footer className="bg-green-700 bg-opacity-30 font-bold text-center p-6">
      <div className="container">
        Created By{" "}
        <a
          href="https://ahmed-profile.vercel.app"
          rel="nofollow"
          target="_blank"
          className="underline"
        >
          Ahmed Tarek
        </a>{" "}
        - {new Date().getFullYear()} ©
      </div>
    </footer>
  );
};
export default Footer;
