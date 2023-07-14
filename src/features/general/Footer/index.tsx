import LogoSmall from "../../../assets/LogoBlueSmall.png";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 bg-primary-500 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={LogoSmall} />
          <p className="my-5">
            Experience the world with Wander - your trusted partner for
            unforgettable adventures and immersive travel experiences. Let us
            guide you on your next extraordinary journey. Contact us today to
            start your unforgettable adventure!
          </p>
          <p>© WanderNA All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Facebook</p>
          <p className="my-5">Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">
            123 Market Street Suite 456 Jersey City, NJ 07302
          </p>
          <p>(201)-425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
