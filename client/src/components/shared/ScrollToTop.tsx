import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Convert ignored paths to RegExp, interpreting '*' as any characters
const ignoredPaths = [/\/browser\/.*/, /\/browser/]
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    // Check if pathname matches any of the ignored paths
    const shouldIgnore = ignoredPaths.some((pattern) => pattern.test(pathname));
    if (!shouldIgnore) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}