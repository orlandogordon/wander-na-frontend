import useMediaQuery from "../../../hooks/useMediaQuery";
import ActionButton from "../../../shared/ActionButton";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Stats from "./Stats";
import Partnerships from "./Partnerships";
import Hero2 from "./Hero2";
import Cta from "./Cta";
type Props = {};

function Home({}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <div className=" mx-auto max-w-[2080px]">
      <Hero2 />
      {/* <Hero /> */}
      <Partnerships />
      <AboutUs />
      {/* <Stats /> */}
      <Cta />
    </div>
  );
}

export default Home;
