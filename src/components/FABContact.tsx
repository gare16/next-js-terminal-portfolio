"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, X, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactFAB() {
  const [open, setOpen] = useState(false);
  const soc = useTranslations("terminal.social");

  const contacts = [
    { name: "Email", icon: <Mail />, link: "mailto:me@garee.pro" },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: soc("links.linkedIn"),
    },
    { name: "GitHub", icon: <Github />, link: soc("links.github") },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {/* Dropdown items */}
      {open &&
        contacts.map((contact, idx) => (
          <Link
            key={idx}
            href={contact.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition"
          >
            {contact.icon}
            <span>{contact.name}</span>
          </Link>
        ))}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-13 h-13 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition flex items-center justify-center"
        aria-label="Contact"
      >
        {open ? <X /> : <Phone className="rotate-y-180" />}
      </button>
    </div>
  );
}
