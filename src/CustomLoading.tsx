import { CircularProgress } from '@mui/material';
import { NcImage } from './frontoffice/components';
import Logo from "../src/frontoffice/assets/images/logo_secondary_white.png"

const CustomLoading = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <div
            // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
            className={`bg-primary-500 flex flex-col items-center justify-center rounded-[20px] py-[20px] md:py-[20px] lg:py-[20px] xl:py-[20px] px-[20px] md:px-[20px] lg:px-[20px] xl:px-[20px]"}`}
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="true"
        >

            <NcImage src={Logo} className="inline w-8  mb-4" alt="logo" />
            <div className='flex flex-row gap-2 justify-center items-center'>
                <CircularProgress size={20} style={{ color: 'white', }} />
                <p style={{ color: 'white', fontSize: '1.2em' }}>Loading, please wait...</p>
            </div>
        </div>

    </div>
);

export default CustomLoading;