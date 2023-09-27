import { LoginButton, LogoutButton } from "@/components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/components/user.component";

// clean up code and make a request to the backend to get the user data
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        Welcome to Codelitt's Backstage! This project is under construction. See
        the navbar on the left for actions you can already perform.
      </div>
    </main>
  );
}
