import { Routes, Route, Navigate } from "react-router-dom";
import { SelectedWorksGrid } from "./components/SelectedWorksGrid";
import CaseStudyDetail from "./components/CaseStudyDetail";
import { UnbrandedNav } from "./components/UnbrandedNav";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <UnbrandedNav />
      <Routes>
        <Route path="/" element={<SelectedWorksGrid />} />
        <Route path="/project/:slug" element={<CaseStudyDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </>
  );
}
