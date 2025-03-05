import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
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
import { FaHeart } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import type { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineSpaceBar } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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
      icon: "ᛏ",
      color: "#127cea",
    },
    {
      value: "female",
      title: "Valkyries",
      icon: "ᛒ",
      color: "#FFB3DE",
    },
    {
      value: "unisex",
      title: "For All",
      icon: "ᛖ",
      color: "#ffffff",
    },
  ];

  const [gender, setGender] = useState("unisex");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const genderFromUrl = queryParams.get("gender");
    if (genderFromUrl) {
      setGender(genderFromUrl);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        revalidator.revalidate();
      }
    });
  }, []);

  return (
    <div className="min-h-svh">
      {popupActive && (
        <PopUp
          favorites={favorites}
          setFavorites={setFavorites}
          setPopupActive={setPopupActive}
        />
      )}
      <section className="pt-6 w-full">
        <div>
          <h1 className="font-header text-center leading-snug">
            NORSE NAMES <br />
            GEN
          </h1>
        </div>
        <div className="pt-12 max-w-screen-lg container">
          <div>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 shadow-sm max-w-screen-xs">
                {genders.map((el) => (
                  <button
                    key={`gender-${el.value}`}
                    type="button"
                    className={`bg-item-1 hover:bg-item-1h px-4 py-2 border-t border-r border-b border-border-1 first-of-type:border-l w-full text-lg duration-300 ${
                      gender === el.value ? "bg-item-1a" : ""
                    }`}
                    onClick={() => {
                      setGender(el.value);
                      navigate(`?gender=${el.value}`, { replace: true });
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
          <div className="flex justify-center gap-6">
            <AccentButton
              buttonClassName="rounded-xl"
              textClassName="py-4 px-8 text-3xl font-header text-light"
              onClick={() => {
                revalidator.revalidate();
              }}
            >
              <strong>Random Name</strong>
              <MdOutlineSpaceBar className="left-1/2 absolute opacity-45 -translate-x-1/2 -translate-y-[0.65rem]" />
            </AccentButton>
            <button
              type="button"
              onClick={() => {
                setFavorites((prev = []) => {
                  if (prev.includes(loaderData.name)) {
                    return prev.filter((name) => name !== loaderData.name);
                  } else {
                    return [...prev, loaderData.name];
                  }
                });
              }}
            >
              <FaHeart
                className={`text-5xl ${
                  favorites.find((el) => el === loaderData.name)
                    ? "text-item-1"
                    : "text-light"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => {
                setPopupActive(true);
              }}
            >
              <HiOutlineMenu className="text-6xl" />
            </button>
          </div>
          <div className="flex justify-center pt-8">
            <strong className="text-8xl">
              {genders.find((el) => el.value === gender)?.icon}
            </strong>
          </div>
          <div className="flex justify-center py-2 pt-16">
            <div className="relative w-full max-w-[550px]">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <p>Latin Alphabet</p>
                  <strong className="text-6xl">{loaderData.name}</strong>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-right">Runes</p>
                  <strong className="font-runes text-6xl">
                    {loaderData.runes}
                  </strong>
                </div>
              </div>
              <div className="top-0 absolute translate-y-[11rem]">
                <div className="bg-item-1 shadow-md p-6 border border-border-1 rounded-2xl">
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

function PopUp({
  favorites,
  setFavorites,
  setPopupActive,
}: {
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  setPopupActive: Dispatch<SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="z-20 absolute flex justify-center items-center bg-bg bg-opacity-50 w-full h-full overflow-hidden">
      <section className="w-full">
        <div
          className="bg-item-1 p-6 rounded-2xl max-w-screen-md max-h-svh duration-500 container"
          style={{
            transform: active ? "translateY(0%)" : "translateY(100vh)",
          }}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setActive(false);
                setTimeout(() => {
                  setPopupActive(false);
                }, 300);
              }}
            >
              <IoClose className="text-5xl" />
            </button>
          </div>
          <div className="mr-5 rounded-2xl h-[20rem] overflow-y-auto better-scrollbar">
            <div className="gap-2 grid grid-cols-2 px-2">
              {favorites.map((el) => (
                <div
                  className="flex justify-between items-center gap-4 bg-item-2 hover:bg-item-2h px-6 py-2 rounded-2xl w-full cursor-pointer"
                  onClick={() => {
                    setFavorites((prev) => {
                      return prev.filter((name) => name !== el);
                    });
                  }}
                >
                  <strong className="text-4xl">{el}</strong>
                  <MdDelete className="text-4xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
