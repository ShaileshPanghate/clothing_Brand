
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Bestsellers() {
    return (
        <>
            <div className="flex justify-center  h-screen bg-gray-100">
                {/* Container for both images */}
                <div className="flex w-[1540px] h-[700px] gap-4 ">

                    {/* Image 1 */}
                    <div className="relative flex-1 overflow-hidden  group">
                        <Image
                            src="/images/relwen.webp"
                            alt="Menswear"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        {/* Overlay button */}
                        <div className="absolute inset-0 flex justify-center items-center mt-100">
                            <button className="bg-black text-white px-20 py-3 text-xs font-normal uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black">
                                phases of love
                            </button>
                        </div>
                    </div>

                    {/* Image 2 */}
                    <div className="relative flex-1 overflow-hidden  group">
                        <Image
                            src="/images/Withnellwomens.jpg"
                            alt="Womenswear"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        {/* Overlay button */}
                        <div className="absolute inset-0 flex justify-center items-center mt-100">
                            <button className="bg-black text-white px-20 py-3 text-xs font-normal uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-black">
                                floklore of India
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
