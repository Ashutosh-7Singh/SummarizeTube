import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData(){
    const url=new URL("/api/home-page",baseUrl)
    url.search=qs.stringify({
        populate: {
            blocks: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
                link: {
                  populate: true,
                },
                feature: {
                  populate: true,
                },
              },
            },
          },
    });
    return await fetchData(url.href)
}
// async function getStrapiData(path: string) {
//     const baseUrl =getStrapiURL()
//     const url = new URL(path, baseUrl);
//     url.search = homePageQuery;
//     console.log(url.href);
  
//     try {
//       const response = await fetch(url.href, { cache: "no-store" });
//       const data = await response.json();
//       const flattenedData = flattenAttributes(data);
//       console.dir(flattenedData, { depth: null });
//       return flattenedData;
//     } catch (error) {
//       console.error(error);
//     }
//   }