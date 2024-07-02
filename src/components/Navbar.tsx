function Navbar() {
  return (
    <div className=" flex justify-center gap-5 text-2xl uppercase h-[10vh] items-center max-sm:text-xl">
      <a href="/">
        <button className="uppercase">Home</button>
      </a>
      <a href="/about">
        <button className="uppercase">About</button>
      </a>
      <a href="#">
        <button className="uppercase">Github</button>
      </a>
    </div>
  );
}

export default Navbar;
