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
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "./ui-hooks/use-toast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Props {
  businessInfo: any;
}
const ReportBusiness = ({ businessInfo }: Props) => {
  const [reportText, setReportText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleReportTextChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReportText(e.target.value);
  };

  const handleReport = async () => {
    setLoading(true);
    try {
      const review = await axios.post(`/api/report-business/`, {
        business: `${businessInfo.id}`,
        content: reportText,
      });
      setIsOpen(false);
      router.refresh();
      toast({
        title: "Report Successfully Sent",
        description: `We have successfully recieved your report and will notify you once the issue has been resolved.`,
      });
    } catch (error: any) {
      toast({
        title: "Error Submitting Report",
        description: `Something went wrong. Please try again later.`,
      });
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button
          className=" flex items-center gap-2 min-w-60"
          variant={"destructive"}
        >
          <AlertCircle size={16} /> Report
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Report {businessInfo.business_name}</CredenzaTitle>
          <CredenzaDescription className="text-center">
            Report {businessInfo?.business_name} and we'll let you know once the
            issue is resolved
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Textarea
            autoFocus
            className="text-[16px] h-52"
            value={reportText}
            onChange={handleReportTextChange}
            placeholder="Write your review..."
          />
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            variant={"default"}
            disabled={reportText.length < 1}
            type="submit"
            onClick={handleReport}
          >
            {loading ? (
              <>
                Sending your report...{" "}
                <RotatingLines width="20" strokeColor="white" />
              </>
            ) : (
              "Send report"
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ReportBusiness;
