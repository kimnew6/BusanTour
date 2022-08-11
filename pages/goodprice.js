import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../components/Seo";
import { useState } from "react";

const API_KEY = process.env.API_KEY;

export default function Home({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data);
  const onClick = (id, title) => {
    router.push(`/goodpricestore/${title}/${id}`);
  };

  return (
    <div>
      <div className="search" style={{ margin: "15px 0", textAlign: "center" }}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          style={{
            width: "200px",
            height: "30px",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      </div>
      <div className="container">
        <Seo title="착한가격업소" />
        {data?.getGoodPriceStore?.item
          ?.filter((hotplace) => {
            if (searchTerm == "") {
              return hotplace;
            } else if (
              hotplace.adres.toLowerCase().includes(searchTerm.toLowerCase()) ||
              hotplace.sj.toLowerCase().includes(searchTerm.toLowerCase()) ||
              hotplace.locale.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return hotplace;
            }
          })
          .map((hotplace) => (
            <div
              onClick={() => onClick(hotplace.idx, hotplace.sj)}
              className="hotplace"
              key={hotplace.idx}
            >
              <div className="thumbnail">
                <Image
                  alt="thumbnail"
                  src={
                    hotplace.imgFile1
                      ? `https://${hotplace.imgFile1}`
                      : "/광안대교.jpeg"
                  }
                  width={300}
                  height={300}
                  style={{ borderRadius: "10px" }}
                  priority
                />
              </div>
              <div className="title">
                <h4>{hotplace.sj}</h4>
                <h6>{hotplace.locale}</h6>
              </div>
              <h5>{hotplace.cn}</h5>
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
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `http://apis.data.go.kr/6260000/GoodPriceStoreService/getGoodPriceStore?serviceKey=${API_KEY}&resultType=json&numOfRows=100`
  );
  const data = await res.json();

  return { props: { data } };
}
