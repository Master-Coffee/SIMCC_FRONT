"use client";

import { useEffect, useState } from "react";
import { ArticlesHome } from "../homepage/categorias/articles-home";
import { ResearchersHome } from "../homepage/categorias/researchers-home";

import { useModalResult } from "../hooks/use-modal-result";
import { PatentHome } from "../homepage/categorias/patent-home";
import { BookHome } from "../homepage/categorias/book-home";
import { SpeakerHome } from "../homepage/categorias/speaker-home";


const ModalContent = () => {
  const { type } = useModalResult();

  switch (type) {
    case 'articles-home':
      return <ArticlesHome/>
    case 'researchers-home':
      return <ResearchersHome/>
    case 'patent-home':
      return <PatentHome/>
    case 'book-home':
      return <BookHome/>
    case 'speaker-home':
      return <SpeakerHome/>
  }

}
export const ResultProvider = () => {
  const [isMounted, setIsMounted] = useState(false);



  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return  <ModalContent />

}