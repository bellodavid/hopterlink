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
import { useAuth } from "@/contexts/AuthContext";

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
  recentlyViewedBusinesses: any[];
  recentlyViewedLoading: boolean;
  activities: any[];
  activitiesLoading: boolean;
  favorites: any[];
  favoritesLoading: boolean;
  addToFavorites: (businessId: number) => Promise<void>;
  removeFromFavorites: (businessId: number) => Promise<void>;
  addToCollection: (businessId: number) => Promise<void>;
  removeFromCollection: (businessId: number) => Promise<void>;
  submitReview: (
    businessId: number,
    comment: string,
    rating: number
  ) => Promise<void>;
  submitComplaint: (businessId: number, content: string) => Promise<void>;
  createBusiness: (formData: FormData) => Promise<any>;
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
  recentlyViewedBusinesses: [],
  recentlyViewedLoading: true,
  activities: [],
  activitiesLoading: true,
  favorites: [],
  favoritesLoading: true,
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
  addToCollection: async () => {},
  removeFromCollection: async () => {},
  submitReview: async () => {},
  submitComplaint: async () => {},
  createBusiness: async () => {},
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
  const [recentlyViewedBusinesses, setRecentlyViewedBusinesses] = useState<
    any[]
  >([]);
  const [recentlyViewedLoading, setRecentlyViewedLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

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

  // Fetch recently viewed businesses
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      if (status === "authenticated") {
        setRecentlyViewedLoading(true);
        try {
          const response = await axios.get(
            "/api/users/recently-viewed-businesses/"
          );
          setRecentlyViewedBusinesses(response.data);
        } catch (error) {
          console.error("Failed to fetch recently viewed businesses:", error);
          setRecentlyViewedBusinesses([]);
        } finally {
          setRecentlyViewedLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      void fetchRecentlyViewed();
    }
  }, [status]);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      if (status === "authenticated") {
        setActivitiesLoading(true);
        try {
          const response = await axios.get("/api/activities/");
          setActivities(response.data);
        } catch (error) {
          console.error("Failed to fetch activities:", error);
          setActivities([]);
        } finally {
          setActivitiesLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      void fetchActivities();
    }
  }, [status]);

  // Fetch favorites (assuming they're part of collections or a separate endpoint)
  useEffect(() => {
    const fetchFavorites = async () => {
      if (status === "authenticated") {
        setFavoritesLoading(true);
        try {
          // This endpoint might need to be adjusted based on your actual API
          const response = await axios.get("/api/businesses/list_favorites/");
          setFavorites(response.data);
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
          setFavorites([]);
        } finally {
          setFavoritesLoading(false);
        }
      }
    };

    if (status === "authenticated") {
      void fetchFavorites();
    }
  }, [status]);

  // Add business to favorites
  const addToFavorites = async (businessId: number) => {
    if (status === "authenticated") {
      try {
        await axios.post(`/api/businesses/${businessId}/add_favorite/`);
        // Update favorites list
        const response = await axios.get("/api/businesses/list_favorites/");
        setFavorites(response.data);
        toast({
          title: "Success",
          description: "Business added to favorites",
        });
      } catch (error) {
        console.error("Failed to add to favorites:", error);
        toast({
          title: "Error",
          description: "Failed to add business to favorites",
          variant: "destructive",
        });
      }
    }
  };

  // Remove business from favorites
  const removeFromFavorites = async (businessId: number) => {
    if (status === "authenticated") {
      try {
        await axios.post(`/api/businesses/${businessId}/remove_favorite/`);
        // Update favorites list
        const response = await axios.get("/api/businesses/list_favorites/");
        setFavorites(response.data);
        toast({
          title: "Success",
          description: "Business removed from favorites",
        });
      } catch (error) {
        console.error("Failed to remove from favorites:", error);
        toast({
          title: "Error",
          description: "Failed to remove business from favorites",
          variant: "destructive",
        });
      }
    }
  };

  // Add business to collection
  const addToCollection = async (businessId: number) => {
    if (status === "authenticated") {
      try {
        await axios.post(`/api/businesses/${businessId}/add_to_collection/`);
        // Update collections
        const response = await axios.get("/api/collection/");
        setCollections(response.data);
        toast({
          title: "Success",
          description: "Business added to collection",
        });
      } catch (error) {
        console.error("Failed to add to collection:", error);
        toast({
          title: "Error",
          description: "Failed to add business to collection",
          variant: "destructive",
        });
      }
    }
  };

  // Remove business from collection
  const removeFromCollection = async (businessId: number) => {
    if (status === "authenticated") {
      try {
        await axios.post(
          `/api/businesses/${businessId}/remove_from_collection/`
        );
        // Update collections
        const response = await axios.get("/api/collection/");
        setCollections(response.data);
        toast({
          title: "Success",
          description: "Business removed from collection",
        });
      } catch (error) {
        console.error("Failed to remove from collection:", error);
        toast({
          title: "Error",
          description: "Failed to remove business from collection",
          variant: "destructive",
        });
      }
    }
  };

  // Submit a review for a business
  const submitReview = async (
    businessId: number,
    comment: string,
    rating: number
  ) => {
    if (status === "authenticated") {
      try {
        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("rating", rating.toString());

        await axios.post(`/api/businesses/${businessId}/reviews/`, formData);
        toast({
          title: "Success",
          description: "Review submitted successfully",
        });
        return Promise.resolve();
      } catch (error) {
        console.error("Failed to submit review:", error);
        toast({
          title: "Error",
          description: "Failed to submit review",
          variant: "destructive",
        });
        return Promise.reject(error);
      }
    }
  };

  // Submit a complaint for a business
  const submitComplaint = async (businessId: number, content: string) => {
    if (status === "authenticated") {
      try {
        const formData = new FormData();
        formData.append("content", content);

        await axios.post(`/api/businesses/${businessId}/complaints/`, formData);
        toast({
          title: "Success",
          description: "Complaint submitted successfully",
        });
        return Promise.resolve();
      } catch (error) {
        console.error("Failed to submit complaint:", error);
        toast({
          title: "Error",
          description: "Failed to submit complaint",
          variant: "destructive",
        });
        return Promise.reject(error);
      }
    }
  };

  // Function to create a business
  const createBusiness = async (formData: FormData) => {
    if (session?.user) {
      try {
        const response = await axios.post(
          "https://hopterlink.up.railway.app/api/businesses/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to create business:", error.response.data);
        throw error;
      }
    } else {
      throw new Error("User is not authenticated");
    }
  };

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
        recentlyViewedBusinesses,
        recentlyViewedLoading,
        activities,
        activitiesLoading,
        favorites,
        favoritesLoading,
        addToFavorites,
        removeFromFavorites,
        addToCollection,
        removeFromCollection,
        submitReview,
        submitComplaint,
        createBusiness,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
