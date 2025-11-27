export default function ChooseYourFit() {
    return (
        <section className="max-w-7xl mx-auto py-14 px-4">

            {/* Heading */}
            <h2 className="text-center text-3xl font-light tracking-[0.25em] mb-10">
                CHOOSE YOUR FIT
            </h2>

            {/* Split Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-lg border border-gray-200">

                {/* Left Side */}
                <div className="relative group overflow-hidden">
                    <img
                        src="/images/blue-shirt.png"
                        alt="Slim Fit"
                        className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">

                        {/* Title */}
                        <span className="uppercase text-white text-2xl font-semibold tracking-wider">
                            Formal Collection
                        </span>

                        {/* Button */}
                        <button className="px-6 py-2 bg-white text-black font-semibold tracking-wide uppercase hover:bg-black hover:text-white transition rounded-md">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative group overflow-hidden">
                    <img
                        src="/images/jeans-jaket.avif"
                        alt="Oversized Fit"
                        className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">

                        {/* Title */}
                        <span className="uppercase text-white text-2xl font-semibold tracking-wider">
                            Casual Collection
                        </span>

                        {/* Button */}
                        <button className="px-6 py-2 bg-white text-black font-semibold tracking-wide uppercase hover:bg-black hover:text-white transition rounded-md">
                            Shop Now
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
