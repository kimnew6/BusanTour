import { useRouter } from "next/router";
import Image from "next/image";
import Seo from "../../components/Seo";
const API_KEY = process.env.API_KEY;
export default function Detail({ data, params }) {
  const router = useRouter();
  console.log(data);
  const detail = data.getGoodPriceStore.item[0];
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <Image
        className="img"
        alt="mainImg"
        src={detail.imgFile1 ? `https://${detail.imgFile1}` : "/광안대교.jpeg"}
        width={768}
        height={512}
      />
      {detail.imgFile2 && (
        <Image
          className="img"
          alt="img2"
          src={`https://${detail.imgFile2}`}
          width={768}
          height={512}
        />
      )}
      <span className="representativeMenu">{detail.cn}</span>
      <span className="description">
        {detail.intrcn.length > 11 ? detail.intrcn : ""}
      </span>
      <span className="address">주소 : {detail.adres}</span>
      <span className="openingHours">영업 시간 : {detail.bsnTime}</span>
      <span className="contactNumber">전화 번호 : {detail.tel}</span>
      <span className="parkingAt" style={{ marginBottom: "100px" }}>
        주차 유무 : {detail.parkngAt}
      </span>
      <style jsx>{`
        .img {
          margin: 10px 0;
        }
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
        .contactNumber,
        .parkingAt {
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
    `http://apis.data.go.kr/6260000/GoodPriceStoreService/getGoodPriceStore?serviceKey=${API_KEY}&resultType=json&sj=${params[0]}`
  );
  const data = await res.json();
  return {
    props: { data, params },
  };
}
