import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";

const AccountLinks = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  let isAdmin;

  if (user) {
    const { data } = await supabase
      .from("users")
      .select("isAdmin")
      .eq("id", user.id)
      .single();

    isAdmin = data?.isAdmin;
  }

  return (
    <div className="flex items-start gap-4 my-auto">
      {user ? (
        <>
          <div onClick={LogOut} className="button-secondary">
            Log Out
          </div>
          {isAdmin && (
            <Link className="button-secondary" href="/create">
              Create Post
            </Link>
          )}
        </>
      ) : (
        <>
          <Link className="button-secondary" href="/auth/login">
            Log In
          </Link>
          <Link className="button-secondary" href="/auth/signup">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountLinks;
