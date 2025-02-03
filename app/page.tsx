import BaseHeader from "./components/layout/baseHeader";
import { SearchBar } from "./components/root/searchBar";
import { SearchAnimeButton } from "./components/root/searchanime";

export default function Home() {
  return (
    <div>
      <BaseHeader />
      <div className="rounded-3xl bg-slate-600 mx-8 my-2 root-container" style={{position: 'relative'}}>
        <div className="root-image-container rounded-3xl " style={{ position: "absolute", top: "0", right: "0", bottom: "0", width: "650px", overflow: "hidden" }}>
          <img style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover", opacity: "0.5" }} src="/root-bg.webp" alt="" />
        </div>
        <div style={{zIndex:100, position:"relative", maxWidth:"500px"}}>
          <h1 className="text-gray-300 text-6xl mb-2">am Archives</h1>
          <SearchBar name={""}/>
          <div className="pt-4 text-white">
            <p>Top search:Blue Lock, Solo Leveling, Dandadan, Blue Lock Season 2, One Piece, Shangri-La Frontier Season 2, Dragon Ball Dai , Tower of God Season 2: Workshop Battle, Frieren: Beyond Journey's End....
            </p>
          </div>
          <SearchAnimeButton/>
        </div>
      </div>
    </div>
  );
}
