import { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import AuthGroupLayout from "../layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <AuthGroupLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthGroupLayout>
  );
}
