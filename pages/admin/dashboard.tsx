import AdminNavbar from "@/components/Admin/Side/AdminNavbar";
import React from "react";

import Head from "next/head";
import UserList from "@/components/Admin/Side/UserList";

const dashboard = () => {
  return (
    <div>
      <Head>
        <title>Kira Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <AdminNavbar />

      <h1 className="text-4xl font-medium ml-2">User List</h1>

      <UserList />
    </div>
  );
};

export default dashboard;
