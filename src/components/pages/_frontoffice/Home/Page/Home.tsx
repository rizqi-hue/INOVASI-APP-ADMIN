import VisiMisi from "../../VisiMisi";
import BrandsSlider from "./BrandSlider";
import HeroBanner from "./HeroBanner";
import LatestInovation from "./LatestInovation";
import LatestResearch from "./LatestResearch";
import PhotoCard from "./PhotoCard";
import ServicesCard from "./ServicesCard";
import Title from "./Title";
// import ServicesCardHome from "./ServicesCardHome";

export default function Home() {
    return (
        <>
            <div className="gradient-bg">
                <HeroBanner />
                {/* <BrandsSlider /> */}
                <ServicesCard />
                {/* <Title /> */}
                <VisiMisi />

                <LatestInovation />

                <LatestResearch />

                {/* <ServicesCardHome /> */}
                <div className="container mx-auto mt-10">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <PhotoCard />
                    </div>
                </div>
            </div>
        </>
    )
}
