"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthorizePage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = () => {
    const submitRequest = async () => {
      setIsDisabled(true);

      try {
        const response = await axios.post("/api/auth", { nip: value });

        if (response.status === 200) {
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          toast("Trop de tentatives. Réessayez dans une minute.");
        } else {
          toast("Le NIP est incorrect. Veuillez réessayer.");
        }
      } finally {
        setValue("");
        setIsDisabled(false);
      }
    };

    submitRequest();
  };

  useEffect(() => {
    setIsDisabled(value.length !== 4);
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
