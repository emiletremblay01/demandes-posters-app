"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AuthorizePage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    const fetch = async () => {
      setIsDisabled(true);
      let isValid = false;
      try {
        // #region agent log
        fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/(root)/auth/login/page.tsx:handleSubmit',message:'Client submitting NIP',data:{valueLength:value.length,valueType:typeof value},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        const response = await axios.post("/api/auth", { nip: value });
        if (response.status === 200) {
          isValid = true;
          router.push("/");
          return;
        }
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7357/ingest/d1805fe8-e2c6-4bc4-8ee3-a6adb9e48d40',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3245e0'},body:JSON.stringify({sessionId:'3245e0',location:'app/(root)/auth/login/page.tsx:catch',message:'Client auth request failed',data:{isAxiosError:axios.isAxiosError(error),status:axios.isAxiosError(error)?error.response?.status:null,responseData:axios.isAxiosError(error)?String(error.response?.data):null,errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),hypothesisId:'H4,H5'})}).catch(()=>{});
        // #endregion
        console.error(error);
      } finally {
        setValue("");
        if (!isValid) {
          toast("Le NIP est incorrect. Veuillez réessayer.");
        }
        setIsDisabled(false);
        router.refresh();
      }
    };
    fetch();
  };
  useEffect(() => {
    if (value.length === 4) {
      setIsDisabled(false);
    }
  }, [value]);
  return (
    <div className="my-64 flex h-full flex-1 flex-col items-center space-y-4">
      <div className="text-center text-sm">
        Entrez votre NIP à 4 chiffres pour voir et intéragir avec les données.
        <br />
        (même que Uber Eats)
      </div>
      <InputOTP
        maxLength={4}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>

      <Button disabled={isDisabled} onClick={handleSubmit}>
        Soumettre
      </Button>
    </div>
  );
}
