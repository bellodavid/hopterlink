import { Switch } from "@/components/ui/switch";
import animationData from "@/constants/verify_email.json";
import Stepper from "@keyvaluesystems/react-stepper";
import axios from "axios";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "./ui-hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PhoneInput } from "./ui/phone-input";
import Typography from "./ui/typography";
import Logo from "./Logo";

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(true);
  const [errors, setErrors] = useState({});

  // Define the Zod schema
  const signUpSchema = z
    .object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phone: z
        .string()
        .min(6, "Phone Number must be at least 6 numbers")
        .max(15, "Phone Number cannot be more than 15 numbers"),
      password1: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be no longer than 64 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character"
        ),
      password2: z
        .string()
        .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password1 === data.password2, {
      message: "Passwords don't match",
      path: ["password2"], // Path to the error
    });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    try {
      signUpSchema.parse(formData);
      setIsFormValid(true);
      setErrors({});
    } catch (e) {
      if (e instanceof z.ZodError) {
        const formattedErrors = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
      setIsFormValid(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsFormValid(false);
      signUpSchema.parse(formData); // Ensure data is valid before submission
      const form = JSON.stringify(formData);
      const response = await axios.post("/api/signup/", form);
      if (response.status === 201) {
        toast({
          title: "Account Created Successfully",
          description: "You have successfully created an account on hopterlink",
        });
        setTimeout(() => {
          setCurrentStepIndex(1);
        }, 2000);
      } else {
        setIsFormValid(false);
        toast({
          title: "Error encountered",
          description: "Invalid credentials provided.",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
        toast({
          title: "Validation Error",
          description: "Please correct the highlighted errors.",
        });
        setIsFormValid(true);
      } else if (error.response && error.response.data) {
        // Backend error handling
        const backendErrors = error.response.data;
        if (backendErrors.non_field_errors) {
          toast({
            title: "Signup Error",
            description: backendErrors.non_field_errors.join(" "),
          });
        } else {
          // Handle other specific error fields if necessary
          const formattedErrors = Object.entries(backendErrors).reduce(
            (acc, [key, value]) => {
              acc[key] = Array.isArray(value) ? value.join(" ") : value;
              return acc;
            },
            {}
          );
          setErrors(formattedErrors);
          toast({
            title: "Signup Error",
            description: "Please correct the errors and try again.",
          });
        }
        setIsFormValid(true);
      } else {
        console.error("SignUp Error:", error);
        toast({
          title: "Signup Error",
          description: "An unexpected error occurred. Please try again later.",
        });
        setIsFormValid(true);
      }
    }
  };

  const handleOTPSubmit = () => {
    // Simulate OTP verification
    setCurrentStepIndex(2); // Move to the next step after successful OTP verification
  };

  const steps = [
    {
      stepLabel: "Sign Up",
      completed: currentStepIndex > 0,
    },
    {
      stepLabel: "Verification",
      completed: currentStepIndex > 1,
    },
    {
      stepLabel: "Activation",
      completed: currentStepIndex > 2,
    },
  ];

  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#028A0F",
    }),
    ActiveNode: () => ({
      backgroundColor: "#C55E0C",
    }),
    CompletedNode: () => ({
      backgroundColor: "#028A0F",
    }),
  };

  return (
    <div className="rounded-lg text-card-[#c55e0c] shadow-sm w-full max-w-sm">
      <Stepper
        steps={steps}
        currentStepIndex={currentStepIndex}
        orientation="horizontal"
        labelPosition="bottom"
        showDescriptionsForAllSteps={true}
        styles={styles}
      />
      {currentStepIndex === 0 && (
        <div className="rounded-lg text-card-[#c55e0c] shadow-sm w-full max-w-sm">
          <div
            className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6"
          >
            <div className="hidden justify-center items-center max-lg:flex">
              <Logo />
            </div>
            <Typography
              variant={"h2"}
              className="font-semibold tracking-tight "
            >
              Sign Up
            </Typography>
            <p className="text-sm text-muted-foreground">
              Enter your details below to join Hopterlink.
            </p>
            <Link href={`/login`} className="text-xs text-[#c55e0c]">
              Already have an account?
            </Link>
          </div>
          <div className="p-6 pt-0 grid gap-4">
            <div className=" gap-2 flex flex-row ">
              <div className="">
                <Label
                  className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="first_name"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input
                    bg-background px-3 py-2 text-[16px] ring-offset-background
                   placeholder:text-muted-foreground
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50"
                  id="first_name"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  control-id="ControlID-1"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs">{errors.first_name}</p>
                )}
              </div>
              <div>
                <Label
                  className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="last_name"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input
                    bg-background px-3 py-2 text-[16px] ring-offset-background
                    file:border-0 file:bg-transparent file:text-sm
                    file:font-medium placeholder:text-muted-foreground
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50"
                  id="last_name"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  control-id="ControlID-1"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs">{errors.last_name}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                id="phone"
                className="text-[16px]"
                defaultCountry="NG"
                value={formData.phone}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    phone: value,
                  });
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                type="email"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-[16px] ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visibe:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password1"
              >
                Password
              </Label>
              <Input
                type="password"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-[16px] ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="password1"
                placeholder="●●●●●●●●●"
                value={formData.password1}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
              {errors.password1 && (
                <p className="text-red-500 text-xs">{errors.password1}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password2"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-[16px] ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="password2"
                placeholder="●●●●●●●●●"
                value={formData.password2}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
              {errors.password2 && (
                <p className="text-red-500 text-xs">{errors.password2}</p>
              )}
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs font-extrabold">
                Send me newsletters and promotional emails from hopterlink
              </p>
              <Switch />
            </div>

            <Button
              disabled={!isFormValid}
              onClick={handleSignUp}
              className="inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background
                transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 disabled:pointer-events-none
                disabled:opacity-50 bg-[#c55e0c] text-[#c55e0c]-foreground
                hover:bg-[#c55e0c]/90 h-10 px-4 py-2 w-full"
              control-id="ControlID-3"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      {currentStepIndex === 1 && (
        <div className="rounded-lg text-card-[#c55e0c] w-full max-w-sm">
          <div
            className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6 my-6"
          >
            <h3 className="font-semibold tracking-tight text-2xl mb-12">
              Verification
            </h3>
            <div className="flex gap-4 justify-center w-full">
              {/* Add your OTP inputs here */}
              <Lottie
                animationData={animationData}
                className="flex justify-center items-center"
                loop={true}
              />
            </div>
            <div className="mt-12">
              <p className="text-grey-500 text-sm mt-6">
                We just sent a verification link to your registered email{" "}
                {formData.email}. Please check your spam or junk folders if you
                can't see it in your primary inbox.
              </p>
            </div>
          </div>
        </div>
      )}
      {currentStepIndex === 2 && (
        <div
          className="flex flex-col text-center justify-center items-center
            space-y-1.5 p-6 my-6"
        >
          <h3 className="font-semibold tracking-tight text-2xl mb-12">
            Account created successfully
          </h3>
          <p className="text-grey-500 text-xs mt-12">
            Your account has been created and verified successfully. We will now
            redirect you..
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
