import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
        <div>Welcome to Backstage!</div>
        <div>
          This project is under construction. See the sidebar on the left for
          actions you can already perform.
        </div>
      </div>
    </main>
  );
}
