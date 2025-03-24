/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

"use client";
import DetailCard from "@/components/DetailCard";
import HeaderContainer from "@/components/HeaderContainer";
import SearchLoaders from "@/components/SearchLoaders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchComponent from "@/components/SearchComponent";

interface Props {
  params: { slug: string };
}

const Page = ({ params }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"businesses" | "categories">(
    "businesses"
  );
  const [filter, setFilter] = useState("Recommended");
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/search/${search}`);
        // setCategories(response.data.categories);
        setBusinesses(response.data);
        setLoading(false);
        if (
          response.data.businesses.length === 0 &&
          response.data.categories.length > 0
        ) {
          setActiveTab("categories");
          setSelectedCategory(response.data.categories[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    void fetchData();
  }, [search]);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setActiveTab("categories");
  };

  const handleBusinessClick = (item: number) => {
    router.push(`/business/${item}`);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const filteredBusinesses = (list: any[]) => {
    switch (filter) {
      case "Most Reviewed":
        return [...list].sort((a, b) => b.review_count - a.review_count);
      case "Most Rated":
        return [...list].sort((a, b) => b.average_rating - a.average_rating);
      case "Alphabetical Order":
        return [...list].sort((a, b) =>
          a.business_name.localeCompare(b.business_name)
        );
      default:
        return list;
    }
  };

  const handleTabClick = (tab: "businesses" | "categories") => {
    setActiveTab(tab);
    if (tab === "categories" && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  };
  console.log(businesses);
  return (
    <HeaderContainer>
      <div className="flex flex-col h-full md:py-10 md:px-32 pt-11 pb-24 px-8 w-full text-center gap-12">
        <div className="flex flex-col gap-6 items-start mt-12">
          <Typography className="max-w-2xl text-start" variant="h2">
            Search Results for '{search}'
          </Typography>
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full max-md:items-end mt-6 md:flex-row">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="border-2 border-secondary flex flex-row gap-4 items-center text-xs justify-center w-fit px-4 h-10 rounded-full">
                  <Typography>{filter}</Typography>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => {
                    handleFilterChange("Recommended");
                  }}
                >
                  {filter}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    handleFilterChange("Most Reviewed");
                  }}
                >
                  Most Reviewed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    handleFilterChange("Most Rated");
                  }}
                >
                  Most Rated
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    handleFilterChange("Alphabetical Order");
                  }}
                >
                  Alphabetical Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-row gap-4 items-start w-full mt-6 md:flex-row">
            <div className="flex flex-row gap-4">
              {businesses.length > 0 ? (
                <div
                  onClick={() => {
                    handleTabClick("businesses");
                  }}
                  className={`cursor-pointer p-2 border-2 rounded-full ${
                    activeTab === "businesses"
                      ? "border-[#c55e0c]"
                      : "border-transparent"
                  }`}
                >
                  <Typography>Businesses</Typography>
                </div>
              ) : (
                ""
              )}
              {categories.length > 0 ? (
                <div
                  onClick={() => {
                    handleTabClick("categories");
                  }}
                  className={`cursor-pointer p-2 border-2 rounded-full ${
                    activeTab === "categories"
                      ? "border-[#c55e0c]"
                      : "border-transparent"
                  }`}
                >
                  <Typography>Categories</Typography>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <SearchLoaders />
          ) : (
            <>
              {businesses.length === 0 && categories.length === 0 ? (
                <div className="flex flex-col h-full w-full gap-4 justify-center items-center">
                  <Typography variant="h3">
                    No results found for <br /> ' {search} '
                  </Typography>
                  Try searching again{" "}
                  <div className="">
                    <SearchComponent />
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === "businesses" && businesses.length > 0 && (
                    <div>
                      {filteredBusinesses(businesses).map(
                        (item: {
                          name?: any;
                          tags?: any;
                          hours?: any;
                          description?: any;
                          average_rating?: any;
                          review_count?: any;
                          price_range?: any;
                          id?: number;
                        }) => (
                          <div
                            key={item.name}
                            onClick={() => {
                              handleBusinessClick(item.id);
                            }}
                            className="cursor-pointer"
                          >
                            <DetailCard
                              loading={loading}
                              name={item.business_name}
                              tags={item.tags}
                              hours={item.hours}
                              logo={item.images[0].thumbnail}
                              description={item.location}
                              stars={item.average_rating}
                              review_count={item.review_count}
                              price_range={item.price_range}
                            />
                            <Separator />
                          </div>
                        )
                      )}
                    </div>
                  )}
                  {activeTab === "categories" && categories.length > 0 && (
                    <div>
                      <div className="flex w-full flex-row gap-4 overflow-x-scroll">
                        {categories.map((category) => (
                          <div
                            key={category.name}
                            onClick={() => {
                              handleCategoryClick(category);
                            }}
                            className={`cursor-pointer p-2 flex-shrink-0 ${
                              selectedCategory &&
                              selectedCategory.name === category.name
                                ? "bg-secondary rounded-full px-4 py-2"
                                : "px-4 py-2"
                            }`}
                          >
                            <p className="whitespace-nowrap text-sm">
                              {category.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      {selectedCategory &&
                        selectedCategory.businesses.length > 0 && (
                          <div className="mt-6">
                            {filteredBusinesses(
                              selectedCategory.businesses
                            ).map(
                              (item: {
                                name?: any;
                                tags?: any;
                                hours?: any;
                                description?: any;
                                average_rating?: any;
                                price_range?: any;
                                review_count?: any;
                                slug?: string;
                              }) => (
                                <div
                                  key={item.name}
                                  onClick={() => {
                                    handleBusinessClick(item.slug!);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <DetailCard
                                    loading={loading}
                                    name={item.name}
                                    tags={item.tags}
                                    hours={item.hours}
                                    description={item.description}
                                    stars={item.average_rating}
                                    price_range={item.price_range}
                                    review_count={item.review_count}
                                  />
                                  <Separator />
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;
