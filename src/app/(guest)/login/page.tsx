import LoginForm from "@/features/auth/components/LoginForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return <LoginForm />;
}
