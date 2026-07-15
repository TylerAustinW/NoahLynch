import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wrong Note",
  description: "Looks like you hit a wrong note! This page doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WrongNoteRoute() {}
