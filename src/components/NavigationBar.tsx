import NavButton from "@/components/NavButton";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-100px] top-[150px] ">
      <NavButton href="/">Home</NavButton>
      <NavButton href="/my">My Page</NavButton>
      <NavButton href="/post">Post</NavButton>
    </div>
  );
};

export default NavigationBar;
