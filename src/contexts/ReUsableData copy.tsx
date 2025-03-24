"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Category } from "@/constants/constants";
import axios from "axios";
import { toast } from "@/components/ui-hooks/use-toast";
import { useSession } from "next-auth/react";

interface CategoriesContextType {
  categories: Category[];
  collections: [];
  collectionLoading: boolean;
  setCollections: React.Dispatch<any>;
  setCollectionLoading: React.Dispatch<any>;
  loading: boolean;
  initialized: boolean;
  user: any | undefined;
  userInfo: any | null;
  userLoading: boolean;
  businessData: any | null;
  businessDataLoading: boolean;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  collections: [],
  collectionLoading: true,
  setCollections: () => {},
  setCollectionLoading: () => {},
  loading: true,
  initialized: false,
  user: undefined,
  userInfo: null,
  userLoading: true,
  businessData: null,
  businessDataLoading: true,
});

interface Props {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [collections, setCollections] = useState<[]>([]);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [businessData, setBusinessData] = useState<any | null>(null);
  const [businessDataLoading, setBusinessDataLoading] = useState(true);
  const { data: session, status } = useSession();
  const [initialized, setInitialized] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedData = await axios.get("/api/categories");
        if (fetchedData) {
          const fetchedCategories = Object.values(
            fetchedData.data.results
          ) as Category[];
          setCategories(fetchedCategories);
          setLoading(false);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
        toast({
          title: "Network error",
          description: "Ensure you have a stable internet connection.",
        });
      }
    };
    fetchCategories();
  }, []);

  // Fetch collections if user is authenticated
  useEffect(() => {
    const fetchCollection = async () => {
      if (status === "authenticated" && session?.user) {
        setCollectionLoading(true);

        try {
          const response = await axios.get("/api/collection/");
          setCollections(response.data);
        } catch (error) {
          console.error("Failed to fetch collection:", error);
        } finally {
          setCollectionLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      void fetchCollection();
    } else if (status === "unauthenticated") {
      setCollections([]);
    }
  }, [status, session]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (status === "authenticated") {
        setUserLoading(true);
        try {
          const response = await axios.get("/api/account/");
          const userData = response.data;
          setUserInfo(userData);

          if (userData?.is_business) {
            setBusinessDataLoading(true);
            try {
              const businessResponse = await axios.get("/api/user-business/");
              setBusinessData(businessResponse.data);
            } catch (error) {
              console.error("Error fetching business data:", error);
              setBusinessData(null);
            } finally {
              setBusinessDataLoading(false);
            }
          } else {
            setBusinessData(null);
            setBusinessDataLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
          setUserLoading(false);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserInfo(null);
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [status]);

  return (
    <CategoriesContext.Provider
      value={{
        collections,
        setCollections,
        collectionLoading,
        categories,
        loading,
        initialized,
        user: session?.user,
        userInfo,
        userLoading,
        businessData,
        businessDataLoading,
        setCollectionLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
