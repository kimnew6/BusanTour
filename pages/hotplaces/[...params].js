import { useRouter } from "next/router";
import Image from "next/image";
import Seo from "../../components/Seo";
import { useEffect } from "react";

const API_KEY = process.env.API_KEY;
const NEXT_PUBLIC_KAKAOMAP_APPKEY = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;

export default function Detail({ data, params }) {
  const router = useRouter();
  console.log(data);
  const detail = data.getFoodKr.item[0];
  const [title, id] = params || [];

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(detail.LAT, detail.LNG),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          detail.LAT,
          detail.LNG
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [detail.LAT, detail.LNG]);

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <Image
        alt="mainImg"
        src={detail.MAIN_IMG_NORMAL}
        width={768}
        height={512}
      />
      <span className="representativeMenu">
        대표 메뉴 : {detail.RPRSNTV_MENU}
      </span>
      <span className="description">{detail.ITEMCNTNTS}</span>
      <span className="address">주소 : {detail.ADDR1}</span>
      <span className="openingHours">
        영업 시간 : {detail.USAGE_DAY_WEEK_AND_TIME}
      </span>
      <span className="contactNumber">전화 번호 : {detail.CNTCT_TEL}</span>
      <div
        id="map"
        style={{ width: "520px", height: "300px", margin: "50px 0" }}
      ></div>
      <style jsx>{`
        span {
          display: block;
        }
        .representativeMenu {
          font-weight: bold;
        }
        .description {
          margin: 15px 0;
        }
        .address,
        .openingHours,
        .contactNumber {
          margin-bottom: 5px;
          color: grey;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const res = await fetch(
    `http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${API_KEY}&resultType=json&UC_SEQ=${params[1]}`
  );
  const data = await res.json();
  return {
    props: { data, params },
    fallback: false,
  };
}
