import PostList from "./_components/PostList";
import Artist from "./artist/Artist";
import Playlists from "./playlists/_components/Playlists";


const MainPage = () => {
  return (
    <div className="p-4">
      <Playlists />
      <PostList />
      <Artist />
    </div>
  );
};

export default MainPage;
