"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/globalContext";
import EbookForm from "../components/Forms/EbookForm";
import EbooksList from "../components/Lists/EbooksList/EbooksList";

import "./Admin.css";

export default function Admin() {
  const {
    user,
    isAdmin,
    viewEbookForm,
    setViewEbookForm,
    viewUpdateEbookForm,
    setViewUpdateEbookForm,
    ebookClickedForUpdate,
  } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    if (ebookClickedForUpdate) {
      setViewUpdateEbookForm(true);
    }
  }, [ebookClickedForUpdate]);

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="admin">
      <h1>Admin</h1>
      <button onClick={() => setViewEbookForm(!viewEbookForm)}>Ebook</button>
      {viewEbookForm && <EbookForm />}
      {viewUpdateEbookForm && <EbookForm ebook={ebookClickedForUpdate} />}
      <EbooksList />
    </div>
  );
}