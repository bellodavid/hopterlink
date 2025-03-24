import React, { useState } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { StarIcon } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Button } from "./ui/button";
import { Card } from "./ui/cards";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "./ui-hooks/use-toast";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";

interface Props {
  businessInfo: any;
  onReviewAdded: (review: any) => void; // Add this line
}

const AddAReview = ({ businessInfo, onReviewAdded }: Props) => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRating = (rating: any) => {
    setRating(rating);
  };

  const handleReviewTextChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    setLoading(true);
    try {
      const review = await axios.post(`/api/reviews/${businessInfo.id}`, {
        stars: rating,
        content: reviewText,
      });
      setIsOpen(false);
      onReviewAdded(review.data); // Call the function passed as a prop
      router.refresh();
      toast({
        title: "Review Successfully Added",
        description: `Thank you for reviewing ${businessInfo.business_name}! We hope you had a wonderful business experience with them.`,
      });
    } catch (error) {
      toast({
        title: "Error Submitting Review",
        description: `${error.response.data.message}`,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button
          className="flex gap-2 items-center min-w-60"
          variant={"secondary"}
        >
          <StarIcon size={16} /> Add a review
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            Review your experience with {businessInfo?.business_name}
          </CredenzaTitle>
          <CredenzaDescription>
            Make sure you have had some interaction with{" "}
            {businessInfo?.business_name} before you leave a review.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Card className="p-4">
            <Rating
              SVGclassName={"inline-block"}
              emptyIcon={<StarIcon size={30} />}
              onClick={handleRating}
              fillIcon={<StarIcon size={30} />}
              fillColor="#c55e0c"
              showTooltip
              tooltipClassName="rating-tooltip"
              initialValue={1}
              tooltipStyle={{
                backgroundColor: "#c55e0c",
                borderRadius: "50px",
                fontSize: "12px",
                padding: "5px 10px",
                marginTop: "-10px",
              }}
              tooltipDefaultText={`Rate ${businessInfo?.business_name}`}
              tooltipArray={[
                "Eww, No!",
                "Not Quite",
                "Meh, It’s Okay",
                "Pretty Good",
                "Absolutely Stellar!",
              ]}
              fillStyle={{ display: "-webkit-inline-box" }}
              emptyStyle={{ display: "flex" }}
              transition
            />
            <div className="my-6">
              <p className="mb-2 text-sm">
                A few things to consider in your review
              </p>
              <div className="flex flex-row items-center gap-2 text-sm">
                <p className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1 rounded-full">
                  Response
                </p>
                <p className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1 rounded-full">
                  Delivery Time
                </p>
                <p className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1 rounded-full">
                  Attitude
                </p>
              </div>
            </div>
            <Textarea
              className="border-0 h-[300px] text-[16px]"
              maxLength={255}
              required
              value={reviewText}
              onChange={handleReviewTextChange}
              placeholder="Write your review..."
            />
          </Card>
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            variant={"default"}
            disabled={reviewText.length < 1}
            type="submit"
            onClick={handleSubmitReview}
          >
            {loading ? (
              <>
                Posting your review...{" "}
                <RotatingLines width="20" strokeColor="white" />
              </>
            ) : (
              "Post Review"
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default AddAReview;
