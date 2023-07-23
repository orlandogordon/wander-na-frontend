import useMediaQuery from "../../../hooks/useMediaQuery";
import HeroAlt from "./HeroAlt";
import AboutUs from "./AboutUs";
import Partnerships from "./Partnerships";
import Hero from "./Hero";
import Cta from "./Cta";
type Props = {};

function Home({}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <div className=" mx-auto max-w-[2080px]">
      <Hero />
      <Partnerships />
      <AboutUs />
      <Cta />
    </div>
  );
}

export default Home;
