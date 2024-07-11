import NavButton from "@/components/NavButton";

const NavigationBar = () => {
  return (
    <div className="flex flex-col gap-4 absolute right-[-100px] top-[150px] z-50">
      <NavButton>Home</NavButton>
      <NavButton>My Page</NavButton>
      <NavButton>Home</NavButton>
    </div>
  );
};

export default NavigationBar;
