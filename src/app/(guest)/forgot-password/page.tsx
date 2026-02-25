import { Suspense } from "react";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import AuthGroupLayout from "../layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <AuthGroupLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthGroupLayout>
  );
}
