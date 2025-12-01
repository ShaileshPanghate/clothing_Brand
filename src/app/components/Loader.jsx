export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">

        {/* Outer spinner ring */}
        <div className="w-40 h-40 border-4 border-gray-300 border-t-black rounded-full animate-spin absolute"></div>

        {/* Rotating logo */}
        <img
          src="/images/logo/logo.png"
          alt="Loading..."
          className="w-28 h-28 animate-spin-slow"
        />

      </div>
    </div>
  );
}
