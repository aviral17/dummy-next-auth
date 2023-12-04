import React from "react";
import Link from "next/link";

const Profile: React.FC = () => {
  return (
    <div className="bg-white">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page created with Next.js and TypeScript.</p>
      <Link href="/about">Go to About Page</Link>
    </div>
  );
};

export default Profile;
