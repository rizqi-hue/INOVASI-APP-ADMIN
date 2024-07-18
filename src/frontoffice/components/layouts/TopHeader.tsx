function TopHeader() {
    return (
        <div className="bg-[#b3b149] py-[12px]">
            <div className="container mx-auto lg:max-w-[1710px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-[10px]">
                        <div className="shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M14.2552 11.9131L12.4127 13.7619C11.6655 14.5117 10.3508 14.5279 9.58746 13.7619L7.74483 11.9131L1.12695 18.5525C1.37329 18.6664 1.6449 18.7344 1.93365 18.7344H20.0665C20.3552 18.7344 20.6267 18.6665 20.873 18.5525L14.2552 11.9131Z" fill="#b3b149" />
                                <path d="M20.0664 3.26562H1.93356C1.64481 3.26562 1.37321 3.3336 1.12695 3.44751L8.19862 10.5426C8.19909 10.5431 8.19965 10.5432 8.20012 10.5437C8.2006 10.5441 8.20068 10.5448 8.20068 10.5448L10.5001 12.8518C10.7443 13.096 11.2557 13.096 11.5 12.8518L13.7989 10.5452C13.7989 10.5452 13.7994 10.5441 13.7999 10.5437C13.7999 10.5437 13.8009 10.5431 13.8014 10.5426L20.8729 3.44747C20.6266 3.33352 20.3551 3.26562 20.0664 3.26562Z" fill="#b3b149" />
                                <path d="M0.205648 4.34894C0.0782031 4.60666 0 4.89275 0 5.1992V16.8008C0 17.1072 0.0781172 17.3933 0.205605 17.651L6.83495 11.0002L0.205648 4.34894Z" fill="#b3b149" />
                                <path d="M21.7943 4.34888L15.165 11.0002L21.7943 17.6511C21.9217 17.3934 21.9999 17.1073 21.9999 16.8008V5.19923C21.9999 4.89269 21.9217 4.6066 21.7943 4.34888Z" fill="#b3b149" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-[12px] sm:text-[13px] leading-none">Email us</p>
                            <a href="mailto:support@adla.com" className="text-black font-semibold leading-none text-[13px] sm:text-[15px] hover:text-[#b3b149]">support@adla.com</a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-[10px]">
                        <div className="shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g clipPath="url(#clip0_205_89)">
                                    <path d="M18.9558 15.312C17.6268 14.1753 16.2781 13.4868 14.9654 14.6217L14.1815 15.3077C13.608 15.8057 12.5417 18.1323 8.41902 13.3897C4.29718 8.65319 6.75002 7.91571 7.32438 7.42205L8.11252 6.73522C9.41835 5.59766 8.92555 4.16562 7.98374 2.69151L7.41539 1.79864C6.46928 0.327964 5.43904 -0.63789 4.12977 0.497954L3.42233 1.1161C2.84368 1.53764 1.2262 2.90787 0.833846 5.51095C0.361651 8.63431 1.85121 12.211 5.26389 16.1353C8.67228 20.0614 12.0094 22.0335 15.1705 21.9991C17.7977 21.9708 19.3842 20.5611 19.8805 20.0485L20.5905 19.4295C21.8963 18.2946 21.085 17.139 19.7551 15.9997L18.9558 15.312Z" fill="#b3b149" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_205_89">
                                        <rect width="22" height="22" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <div>
                            <p className="text-[13px] leading-none">Call us</p>
                            <a href="tel:+1-485-456-0102" className="text-black font-semibold leading-none text-[13px] sm:text-[15px] hover:text-[#b3b149]">+1-485-456-0102</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader