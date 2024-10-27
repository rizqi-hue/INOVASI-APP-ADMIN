import { NcImage } from "../../../../atoms"
// import Building from "../../../assets/images/building.jpg"

export default function Title() {
    return (
        <section className="container flex justify-between items-center rounded-xl lg:rounded-2xl overflow-hidden relative mt-5">
            <div className="absolute top-0 left-0 right-0 bottom-0">
                <div className="bg-gradient-to-r from-white via-gray-100 to-transparent h-screen flex items-center justify-center">
                    <h1 className="text-white text-4xl">Custom Gradient Background</h1>
                </div>
            </div>
            <div className="w-full md:w-1/2 relative z-10 px-4 sm:px-8 max-xl:py-5 max-lg:overflow-hidden">
                {/* <FadeRight> */}
                <h2 className="heading-2 text-gray-600">
                    Riset dan Inovasi <br />
                    Industri Halal
                </h2>
                {/* </FadeRight> */}

            </div>
            <div className="w-1/2 max-md:hidden self-stretch h-18">
                {/* <NcImage src={Building} alt="love image" className="object-cover w-full h-full rounded-2xl" /> */}
            </div>
        </section >
    )
}
