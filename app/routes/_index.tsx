import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/cloudflare";
import * as cheerio from "cheerio";
import { translateForRunes } from "server/lib/data";
import AccentButton from "../components/basic/buttons/AccentButton";
import {
  useLoaderData,
  useRevalidator,
  useNavigate,
  useLocation,
} from "@remix-run/react";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const gender = url.searchParams.get("gender") || "unisex"; // Domyślnie unisex, jeśli nie ma w URL

  const response = await fetch(
    "https://moonboon.pl/blogs/baby-names/nordic-names?shpxid=237320ed-920b-4c58-b6e5-328374265774"
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const names: { name: string; meaning: string }[] = [];

  const switches = [
    {
      gender: "female",
      number: 0,
    },
    {
      gender: "male",
      number: 1,
    },
    {
      gender: "unisex",
      number: 2,
    },
  ];

  function scrape(number: number) {
    $("ol")
      .eq(number)
      .find("li")
      .each((_, element) => {
        const name = $(element).find("strong").text().trim();
        const meaning = $(element)
          .text()
          .replace(name, "")
          .trim()
          .replace("–", "")
          .trim();

        if (name && meaning) {
          names.push({ name, meaning });
        }
      });
  }

  for (const el of switches) {
    if (el.gender === gender) {
      scrape(el.number);
    }
  }

  if (names.length === 0) {
    scrape(2);
  }

  function getRandomName(): { name: string; meaning: string } {
    // Losowo wybieramy typ imienia na podstawie płci z URL
    const selectedNames = names;

    const selectedName =
      selectedNames[Math.floor(Math.random() * selectedNames.length)];

    return selectedName;
  }

  const randomName = getRandomName();

  return {
    ...randomName,
    runes: translateForRunes(randomName.name),
  };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const location = useLocation();

  const genders = [
    {
      value: "male",
      title: "Vikings",
    },
    {
      value: "female",
      title: "Valkyries",
    },
    {
      value: "unisex",
      title: "For All",
    },
  ];

  const [gender, setGender] = useState("unisex");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const genderFromUrl = queryParams.get("gender");
    if (genderFromUrl) {
      setGender(genderFromUrl);
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-svh">
      <section className="w-full">
        <div className="container">
          <div>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 max-w-screen-xs">
                {genders.map((el) => (
                  <button
                    key={`gender-${el.value}`}
                    type="button"
                    className={`bg-item-1 hover:bg-item-1h px-4 py-2 border-t border-r border-b border-border-1 first-of-type:border-l w-full duration-300 ${
                      gender === el.value ? "bg-item-1a" : ""
                    }`}
                    onClick={() => {
                      setGender(el.value);
                      navigate(`?gender=${el}`, { replace: true });
                    }}
                  >
                    {el.title}
                  </button>
                ))}
              </div>
            </div>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className="pt-12"></div>
          </div>
          <div className="flex justify-center">
            <AccentButton
              buttonClassName="rounded-xl"
              textClassName="py-4 text-3xl"
              onClick={() => {
                revalidator.revalidate();
              }}
            >
              Random Name
            </AccentButton>
          </div>
          <div className="flex justify-center py-2 pt-16">
            <div className="relative w-full max-w-[550px]">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <p>Latina Alphabet</p>
                  <strong className="text-6xl">{loaderData.name}</strong>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-right">Runes</p>
                  <strong className="font-runes text-6xl">
                    {loaderData.runes}
                  </strong>
                </div>
              </div>
              <div className="top-0 absolute translate-y-[12.5rem]">
                <div className="bg-item-1 p-6 rounded-2xl">
                  <strong className="text-3xl">{loaderData.meaning}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
