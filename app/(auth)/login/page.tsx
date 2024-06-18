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

export default function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (value.length === 4) {
      const fetch = async () => {
        setIsDisabled(true);
        let isValid = false;
        try {
          const response = await axios.post("/api/auth", { nip: value });
          if (response.status === 200) {
            isValid = true;
            router.push("/");
            return;
          }
        } catch (error) {
          console.error(error);
        } finally {
          setValue("");
          if (!isValid) {
            toast("Le NIP est incorrect. Veuillez réessayer.");
          }
          setIsDisabled(false);
        }
      };

      fetch();
    }
  }, [value]);
  return (
    <div className="my-64 flex h-full flex-1 flex-col items-center space-y-2">
      <InputOTP
        maxLength={4}
        value={value}
        onChange={(value) => setValue(value)}
        disabled={isDisabled}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        Entrez votre NIP à 4 chiffres pour vous connecter. <br /> (même que pour
        UberEats)
      </div>
    </div>
  );
}
