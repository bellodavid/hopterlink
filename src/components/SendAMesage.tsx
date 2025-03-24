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
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Props {
  businessInfo: any;
}
const SendAMesage = ({ businessInfo }: Props) => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          className="flex gap-2 items-center min-w-60"
          variant={"secondary"}
        >
          <MessageCircle size={16} /> Message
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            Send a message to {businessInfo?.business_name}
          </CredenzaTitle>
          <CredenzaDescription>
            Let them know you&apos;re interested in doing business. Keep it
            short and precise.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Textarea autoFocus className="text-[16px]" />
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant={"secondary"}>Send</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default SendAMesage;
