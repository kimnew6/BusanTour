import Seo from "../components/Seo";
import Image from "next/image";
export default function about() {
  return (
    <div style={{ padding: "50px 0" }}>
      <Seo title="about" />
      <h1>About Busan</h1>
      <Image
        src="/광안대교.jpeg"
        alt="gwanganbridge"
        width={768}
        height={512}
      />
      <span style={{ lineHeight: "25px" }}>
        한반도 동남부에 자리한 광역자치단체. 인구는 3,343,504명으로 모든 광역시
        중 외국인을 제외해도 유일한 300만명대 도시이다. 모든 광역자치단체를 다
        합치면 경기도-서울특별시 다음 3위. 광역자치단체들 중 인구 밀도도 서울에
        이어 2위이다. 남쪽으로 바다를 사이로 일본 나가사키현 대마도, 북쪽으로
        경남 양산시 및 울산광역시, 서쪽으로 경남 창원시 진해구, 경남 김해시와
        접하고 있다. 대한민국 제2의 도시이자 대한민국 최초의 직할시 · 광역시이고
        국내 최대국제무역항이 있는 제1의 항구도시, 경상도 최대도시, 제1의
        해양교통과 제2의 항공교통 김해국제공항 타이틀 등을 보유한 도시이기도
        하다. 지역 내 문화 컨텐츠로는 대한민국 최대의 영화제인 부산국제영화제를
        비롯해 G-STAR, 부산국제모터쇼, 부산불꽃축제, 부산항 불꽃축제, 부산
        비엔날레, 부산 원아시아 페스티벌, 자갈치 축제, 부산 해맞이 축제 등이
        유명하다. 6.25 전쟁 때 부산은 대전, 대구에 이은 임시수도였으며 임시수도
        시절부터 부산 경공업의 전성기였던 1970~80년대, 민주항쟁, 1990년대 이후
        주변 지방에 산업 시설을 내주며 동남권을 형성해 온 파란만장한 역사를
        간직하고 있다. 대한민국의 동남쪽 해안에 있다. 동해와 남해가 모두 접해
        있는 지리적 위치로 인해 해양 산업, 해양 교통 등이 발달하였다.
      </span>
    </div>
  );
}
