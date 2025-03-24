import AverageReview from "./AverageReview";
import { Card } from "./ui/cards";

interface Props {
  review: any;
}

const ReviewsCard = ({ review }: Props) => {
  function truncateEmail(email: any) {
    const [name, domain] = email.split("@"); // Split the email into name and domain
    if (name.length > 4) {
      return `${name.slice(0, 5)}***${name.slice(-3)}@${domain}`; // Take first 5 and last 3 characters of the name part
    }
    return email; // If the name is too short, return the email as is
  }
  return (
    <Card className="w-full p-2 mb-4 gap-6 flex flex-col">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-1 items-start">
          {review.user.first_name ? (
            <p className="text-sm font-bold">
              {review.user.first_name} {review.user.last_name}
            </p>
          ) : (
            <p className="text-sm font-bold">
              {truncateEmail(review.user.email)}
            </p>
          )}
        </div>
        <AverageReview size={12} value={review.rating} />
      </div>
      <div>
        <p className="text-xs">{review.comment}</p>
      </div>
    </Card>
  );
};

export default ReviewsCard;
