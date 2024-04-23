import { HeroSection } from "@/components/custom/HeroSection";
import { Button } from "@/components/ui/button";
import { flattenAttributes } from "@/lib/utils";
import Image from "next/image";
import QueryString from "qs";




const homePageQuery = QueryString.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;
  console.log(url.href);

  try {
    const response = await fetch(url.href,{cache:'no-store'});
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    console.dir(flattenedData, { depth: null });
    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}
export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData);
  const { title, description,blocks } = strapiData;
  return (
    <main>
      {/* <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p> */}
      <HeroSection data={blocks[0]}/>
    </main>
  );
}
