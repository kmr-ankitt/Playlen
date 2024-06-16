function Navbar() {
  return (
    <div className=" flex justify-center gap-5 text-2xl font-mono uppercase h-1/6 items-center">
      <a href="/">
        <button>Home</button>
      </a>
      <a href="/about">
        <button>About</button>
      </a>
      <a href="#">
        <button>Github</button>
      </a>
    </div>
  );
}

export default Navbar;
