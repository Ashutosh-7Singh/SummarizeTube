import { FeatureSection } from "@/components/custom/FeaturesSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { Button } from "@/components/ui/button";
import { getHomePageData } from "@/data/loaders";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

import Image from "next/image";
import QueryString from "qs";

// const homePageQuery = QueryString.stringify({
//   populate: {
//     blocks: {
//       populate: {
//         image: {
//           fields: ["url", "alternativeText"],
//         },
//         link: {
//           populate: true,
//         },
//         feature: {
//           populate: true,
//         },
//       },
//     },
//   },
// });
function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const strapiData = await getHomePageData();
  console.log(strapiData);
  const { blocks } = strapiData;
  if(!blocks){
    return<div>No Blocks Found</div>
  }
  return (
    <main>
      {/* <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p> */}
      {/* <HeroSection data={blocks[0]} />
      <FeatureSection data={blocks[1]}/> */}

      {blocks.map((block:any)=>blockRenderer(block))}
    </main>
  );
}
