import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

const API_KEY = process.env.API_KEY;

export default function Home({ data }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/hotplaces/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {data.getFoodKr.item?.map((hotplace) => (
        <div
          onClick={() => onClick(hotplace.UC_SEQ, hotplace.MAIN_TITLE)}
          className="hotplace"
          key={hotplace.UC_SEQ}
        >
          <div className="thumbnail">
            <Image
              alt="thumbnail"
              src={hotplace.MAIN_IMG_THUMB}
              width={300}
              height={300}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="title">
            <h4>{hotplace.MAIN_TITLE}</h4>
            <h6>{hotplace.GUGUN_NM}</h6>
          </div>
          <h5>{hotplace.RPRSNTV_MENU}</h5>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .hotplace {
          position: relative;
          border: 1px solid skyblue;
          border-radius: 10px;
          cursor: pointer;
        }
        .thumbnail {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .thumbnail:hover {
          transform: scale(1.05) translateY(-10px);
        }
        .title {
          display: flex;
          justify-content: space-between;
        }
        .hotplace h4 {
          font-size: 18px;
          margin: 5px 10px;
        }
        .hotplace h5 {
          margin: 5px 10px;
          font-size: 12px;
          color: grey;
        }
        .hotplace h6 {
          position: relative;
          bottom: 0;
          margin: 10px 10px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${API_KEY}&resultType=json&numOfRows=10&pageNo=1`
  );
  const data = await res.json();

  return { props: { data } };
}
