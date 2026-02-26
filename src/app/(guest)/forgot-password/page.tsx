import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return <ForgotPasswordForm />;
}
