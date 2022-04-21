import { useRouter } from "next/router";
import Image from "next/image";
import Seo from "../../components/Seo";
const API_KEY = process.env.API_KEY;
export default function Detail({ data, params }) {
  const router = useRouter();
  console.log(data);
  const detail = data.getFoodKr.item[0];
  const [title, id] = params || [];
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
      <style jsx>{`
        span {
          display: block;
        }
        .representativeMenu {
          font-weight: bold;
        }
        .description {
          margin: 10px 0;
        }
        .address,
        .openingHours,
        .contactNumber {
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
  };
}
