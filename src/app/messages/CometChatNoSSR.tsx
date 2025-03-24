"use client";
import HeaderContainer from "@/components/HeaderContainer";
import { useCategories } from "@/contexts/ReUsableData";
import {
  CometChatConversationsWithMessages,
  CometChatPalette,
  CometChatTheme,
  CometChatThemeContext,
  CometChatUIKit,
  ConversationsConfiguration,
  ConversationsStyle,
  LoaderStyle,
  MessagesConfiguration,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { useSession } from "next-auth/react";
import { COMETCHAT_CONSTANTS } from "@/constants/constants";

function CometChatNoSSR() {
  const { initialized } = useCategories();
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [cometChatInitialized, setCometChatInitialized] = useState(false);
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const { data: session, status } = useSession();
  const { theme: nextTheme } = useTheme();

  // Detect if the device is mobile
  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        try {
          const user = await CometChat.getUser(uid);
          setUser(user);
        } catch (error) {
          console.error("Error fetching CometChat user:", error);
        }
      };
      getUser();
    }
  }, [uid]);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        return /Mobi|Android/i.test(navigator.userAgent);
      }
      return false;
    };
    setIsMobile(checkIsMobile());
  }, []);

  useEffect(() => {
    const initializeCometChat = async () => {
      if (typeof window !== "undefined" && !cometChatInitialized) {
        try {
          const UIKitSettings = new UIKitSettingsBuilder()
            .setAppId(COMETCHAT_CONSTANTS.APP_ID)
            .setRegion(COMETCHAT_CONSTANTS.REGION)
            .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
            .subscribePresenceForAllUsers()
            .build();

          console.log("Initializing CometChat...");
          await CometChatUIKit.init(UIKitSettings);
          console.log("CometChat Initialized");
          setCometChatInitialized(true);
        } catch (error) {
          console.error("CometChat initialization failed:", error);
        }
      }
    };

    initializeCometChat();
  }, [session, status, cometChatInitialized]);

  useEffect(() => {
    const handleCometChatLogin = async () => {
      if (typeof window !== "undefined") {
        const loggedInUser = await CometChatUIKit.getLoggedinUser();
        console.log("Logged in User from CometChat:", loggedInUser);
        if (status === "authenticated" && session?.user?.email) {
          console.log("Logging into CometChat with hopterlink...");
          const user = await CometChatUIKit.login("superman");
          console.log("Login successful:", user);
        }
      }

      if (status === "unauthenticated" && initialized) {
        console.log("Logging out from CometChat...");
        await CometChat.logout();
        console.log("Logout successful");
      }
    };

    handleCometChatLogin();
  }, [status, session?.user?.email, initialized]);

  // Adjust CometChat theme based on next-themes

  const themeContext = useMemo(() => {
    const isDarkMode = nextTheme === "dark";
    return {
      theme: new CometChatTheme({
        palette: new CometChatPalette({
          mode: isDarkMode ? "dark" : "light",
          primary: {
            light: "#c55e0c",
            dark: "#c55e0c",
          },
          accent: {
            light: "#c55e0c",
            dark: "#c55e0c",
          },
          // accent50: {
          //   light: "white",
          //   dark: "#292524",
          // },
          // accent900: {
          //   light: "#292524",
          //   dark: "white",
          // },
        }),
      }),
    };
  }, [nextTheme]);

  const conversationsStyle = new ConversationsStyle({
    width: "100%",
    height: "100%",
    borderRadius: "20px",
  });

  const getLoadingStateView = () => {
    const getLoaderStyle = new LoaderStyle({
      iconTint: "#c55e0c",
      background: "transparent",
      height: "25px",
      width: "25px",
      border: "none",
      borderRadius: "0",
    });

    return (
      <cometchat-loader
        iconURL="https://cdn.svgator.com/assets/landing-pages/static/css-loader/57579212-0-Loaders-2.svg"
        loaderStyle={JSON.stringify(getLoaderStyle)}
      ></cometchat-loader>
    );
  };

  // If CometChat is not initialized or user is not logged in, show loading state
  if (!cometChatInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <HeaderContainer>
      <div style={{ width: "100vw", height: "95dvh" }} className="pt-16">
        <div style={{ height: "100%", width: "100%" }} className="rounded-full">
          <CometChatThemeContext.Provider value={themeContext}>
            <CometChatConversationsWithMessages
              messageText="Chat with Hopterlink business owners"
              conversationsConfiguration={
                new ConversationsConfiguration({
                  conversationsStyle: conversationsStyle,
                  loadingStateView: getLoadingStateView(),
                })
              }
              isMobileView={isMobile}
            />
          </CometChatThemeContext.Provider>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default CometChatNoSSR;
