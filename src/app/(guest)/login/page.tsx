import { Suspense } from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthGroupLayout from "../layout";

export const dynamic = "force-dynamic"; 
export const revalidate = 0;

export default function Page() {
  return (
    <AuthGroupLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthGroupLayout>
  );
}
