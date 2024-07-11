import Artist from "./artist/_components/mainPage/Artist";
import Playlists from "./playlists/_components/Playlists";

const MainPage = () => {
  return (
    <div className="p-4">
      <Playlists />
      <Artist />
    </div>
  );
};

export default MainPage;
