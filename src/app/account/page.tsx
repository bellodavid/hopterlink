"use client";
import ChangePassword from "@/components/ChangePassword";
import EditAProfile from "@/components/EditAProfile";
import HeaderContainer from "@/components/HeaderContainer";
import ListItem from "@/components/ListItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/cards";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import Typography from "@/components/ui/typography";
import { useCategories } from "@/contexts/ReUsableData";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import NumberTicker from "@/components/magicui/number-ticker";
import ManageListing from "@/components/ManageListing";
import { useRouter } from "next/navigation";

const Page = () => {
  const { collections, userInfo, userLoading } = useCategories();

  const loadingStates = [
    {
      text: `Getting your account information..`,
    },
    {
      text: `Receiving information..`,
    },
    {
      text: `Rendering information..`,
    },
  ];

  if (userLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={userLoading}
          duration={1000}
        />
      </div>
    );
  }
  const router = useRouter();
  const { businessData } = useCategories();
  return (
    <HeaderContainer>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full h-fit justify-between"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:py-30 md:px-1.5 pb-24 px-6 flex flex-col w-full mt-24 gap-12"
        >
          <div className="w-full flex items-start flex-row gap-6 max-lg:flex-col max-lg:items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="w-24 h-24 justify-center flex">
                <AvatarImage
                  src={userInfo?.profile}
                  onLoad={() => <RotatingLines />}
                  sizes="lg"
                />
                <AvatarFallback>
                  {userInfo?.first_name?.[0]} {userInfo?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-lg:items-center flex flex-col max-lg:flex-col-reverse"
            >
              <div className="flex w-full justify-between flex-row max-lg:flex-col max-lg:gap-12 items-center">
                <Typography
                  variant={"h1"}
                  className="flex flex-row gap-2 items-center text-center"
                >
                  {userInfo?.first_name || "New"}{" "}
                  {userInfo?.last_name || "User"}
                </Typography>
                <div className="flex flex-row max-lg:flex-col items-center gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <Typography className="font-bold" variant={"h2"}>
                      0
                    </Typography>
                    <p className="text-[#c55e0c] font-bold text-sm text-center">
                      Businesses Reviewed
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Typography className="font-bold" variant={"h2"}>
                      {userInfo?.is_business ? <NumberTicker value={1} /> : "0"}
                    </Typography>
                    <p className="text-[#c55e0c] font-bold text-sm text-center">
                      Businesses owned
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Typography className="font-bold" variant={"h2"}>
                      <NumberTicker value={collections?.length} />
                    </Typography>
                    <p className="text-[#c55e0c] font-bold text-sm text-center">
                      Saved Businesses
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start max-lg:items-center mb-6 flex-col gap-2">
                <Typography
                  variant={"p"}
                  className="text-[#7a7a7a] text-center"
                >
                  {userInfo?.email}
                </Typography>
                <Typography
                  variant={"h5"}
                  className="text-center text-[#7a7a7a]"
                >
                  {userInfo?.bio || "Hey there, I'm a Hopterlinker!"}
                </Typography>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-row gap-4 w-full max-lg:flex-col items-center justify-end max-lg:justify-center"
          >
            <EditAProfile userInfo={userInfo} />
            {userInfo?.is_business ? (
              <>
                {" "}
                <ManageListing />
                <div className="flex items-center gap-4">
                  {businessData && (
                    <Button
                      onClick={() =>
                        router.push(`/business/${businessData.id}`)
                      }
                      className="flex gap-2 items-center min-w-60"
                    >
                      Visit your business
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:py-30 md:px-1.5 pb-24 px-6 flex flex-row max-md:flex-col w-full gap-12"
        >
          <Card className="mt-2 p-4 w-[100%] overflow-hidden mb-4">
            <Typography className="mb-4" variant={"h2"}>
              Settings
            </Typography>
            <motion.div
              style={{
                overflowY: "auto",
                paddingRight: "10px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <ListItem title="Notifications" />
              {/* <ListItem title="Privacy Settings" />
              <ListItem title="Language" /> */}
              <ChangePassword />
              {/* <ListItem title="Delete Account" /> */}
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </HeaderContainer>
  );
};

export default Page;
