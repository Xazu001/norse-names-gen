import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex min-h-svh">
      <aside>
        <strong>Hi!</strong>
      </aside>
      <div className="flex-1">
        <h1>Hi!</h1>
      </div>
    </div>
  );
}
