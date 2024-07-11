import NavButton from "@/components/NavButton";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-100px] top-[150px] z-50">
      <NavButton path="/">Home</NavButton>
      <NavButton path="/my">My Page</NavButton>
      <NavButton path="/">Post</NavButton>
    </div>
  );
};

export default NavigationBar;
