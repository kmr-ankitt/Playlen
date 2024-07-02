function Navbar() {
  return (
    <div className=" flex justify-center gap-5 text-xl uppercase h-[10vh] items-center max-sm:text-[1rem]">
      <a href="/" className=" hover:border-b-4 hover:text-red-200 transition-[2s]">
        <button className="uppercase">Home</button>
      </a>
      <a href="https://github.com/kmr-ankitt" className=" hover:border-b-4 hover:text-red-200 transition-[2s]">
        <button className="uppercase">Github</button>
      </a>
      <a href="https://x.com/kmr_ankitt" className=" hover:border-b-4 hover:text-red-200 transition-[2s]">
        <button className="uppercase">X</button>
      </a>
    </div>
  );
}

export default Navbar;
