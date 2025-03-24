"use client";
import DetailCard from "@/components/DetailCard";
import HeaderContainer from "@/components/HeaderContainer";
import SearchComponent from "@/components/SearchComponent";
import SearchLoaders from "@/components/SearchLoaders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useCategories } from "@/contexts/ReUsableData";
import { Subcategory } from "@/constants/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useInView } from "framer-motion";
import axios from "axios";

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  const { categories, loading: categoriesLoading } = useCategories();
  const [category, setCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [subcategoryData, setSubcategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("Recommended");
  const router = useRouter();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const fetchCategory = () => {
      const id = parseInt(params.id, 10);
      const categoryData = categories.find((cat) => cat.id === id);
      setCategory(categoryData ?? null);
      if (categoryData && categoryData.subcategories.length > 0) {
        const firstSubcategoryId = categoryData.subcategories[0].id;
        setSelectedSubcategory(firstSubcategoryId);
        handleSubcategoryClick(firstSubcategoryId);
      }
    };
    if (!categoriesLoading) {
      fetchCategory();
    }
  }, [params.id, categories, categoriesLoading]);

  const handleBusinessClick = (item: { id: number }) => {
    router.push(`/business/${item.id}`);
  };

  const handleSubcategoryClick = async (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/categories/${params.id}/subcategories/${subcategoryId}`
      );
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      setSubcategoryData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
    console.log("Sort option selected:", sortOption);
  };

  const sortData = (data: any[], sortOption: string) => {
    let sortedData = [...data];
    switch (sortOption) {
      case "Recommended":
        // Sort by recommended logic, if available
        console.log("Sorting by Recommended");
        break;
      case "Most Reviewed":
        sortedData.sort((a, b) => b.review_count - a.review_count);
        console.log("Sorting by Most Reviewed");
        break;
      case "Most Rated":
        sortedData.sort((a, b) => b.average_rating - a.average_rating);
        console.log("Sorting by Most Rated");
        break;
      case "Alphabetical Order":
        sortedData.sort((a, b) =>
          a.business_name.localeCompare(b.business_name)
        );
        console.log("Sorting by Alphabetical Order");
        break;
      default:
        break;
    }
    return sortedData;
  };

  useEffect(() => {
    if (subcategoryData.length > 0) {
      const sortedData = sortData(subcategoryData, sortOption);
      setSubcategoryData(sortedData);
    }
  }, [sortOption, selectedSubcategory]);

  const displayData = selectedSubcategory ? subcategoryData : [];

  return (
    <HeaderContainer>
      <div className="flex flex-col h-full md:py-10 md:px-16 pt-11 pb-24 px-4 w-full text-center gap-12">
        <div className="flex flex-col gap-6 items-start mt-12">
          {category ? (
            <Typography
              className="w-full text-start animate-fade animate-duration-1000"
              variant="h2"
            >
              {category?.name} businesses on Hopterlink
            </Typography>
          ) : (
            <Skeleton className="h-20 w-full my-6 rounded-md bg-secondary items-start p-4" />
          )}
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full max-md:items-end mt-6 md:flex-row">
            {category ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="border-2 border-secondary flex flex-row gap-4 items-center text-xs justify-center w-fit px-4 h-10 rounded-full">
                    <Typography>{sortOption}</Typography> <ChevronDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("Recommended")}
                  >
                    Recommended
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("Most Reviewed")}
                  >
                    Most Reviewed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("Most Rated")}
                  >
                    Most Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("Alphabetical Order")}
                  >
                    Alphabetical Order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Skeleton className="h-10 w-[50%] my-6 rounded-md bg-secondary items-start p-4" />
            )}
          </div>
          <div className="flex-row flex gap-4 items-start mt-6 md:flex-row w-full">
            {categoriesLoading || !category ? (
              <SearchLoaders />
            ) : (
              <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
                  Sponsored Ads <Info size={14} />
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border-none flex items-center scroll-smooth">
                  <div className="flex flex-row gap-2 items-center mt-4 mb-4">
                    {category.subcategories.map(
                      (subcategory: Subcategory, index: number) => (
                        <motion.div
                          key={subcategory.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          onClick={() => handleSubcategoryClick(subcategory.id)}
                          className={`cursor-pointer p-2  rounded-full whitespace-nowrap ${
                            selectedSubcategory === subcategory.id
                              ? "border-[#c55e0c] bg-[#c55e0c] text-white shadow-md font-bold border-0 border-transparent"
                              : "border-[#e5e5e5] text-[#e5e5e5] border-[1px]"
                          }`}
                        >
                          <p className="text-xs">{subcategory.name}</p>
                        </motion.div>
                      )
                    )}
                  </div>
                  <ScrollBar className="hidden" orientation="horizontal" />
                </ScrollArea>
                <div ref={ref} className="mt-6">
                  {loading ? (
                    <SearchLoaders />
                  ) : error ? (
                    <Typography className="text-red-500">{error}</Typography>
                  ) : displayData?.length < 1 ? (
                    <div className="flex w-full h-full items-center justify-center">
                      <Typography variant={"p"}>
                        No results under this subcategory at this time.
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      {displayData?.map((item: any, index: number) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1,
                          }}
                          onClick={() => handleBusinessClick({ id: item.id })}
                          className="cursor-pointer"
                        >
                          <DetailCard
                            loading={categoriesLoading}
                            logo={
                              item.images[0]?.thumbnail || item.images[0]?.image
                            }
                            review_count={item.review_count} // Adjust based on your actual data
                            stars={item.average_rating} // Adjust based on your actual data
                            name={item.business_name}
                            description={item.location}
                          />
                          <Separator />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;
