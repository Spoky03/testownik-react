import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation("translation", {
    keyPrefix: "FOOTER",
  });
  const [revealMail, setRevealMail] = useState(false);
  return (
    <footer className="flex justify-center bg-primary text-text lg:text-left black:border-t">
      <div className="mx-6 p-10 text-center md:text-left max-w-5xl w-full">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* <!-- TW Elements section --> */}
          <div className="col-span-2">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              {t("TITLE")} {year}
            </h6>
            <p>
              {t("DESCRIPTION")}{" "}
              <a href="https://github.com/kumalg/testownik-electron" className="link hover:text-success">
                {t("INLINE")}
              </a>
            </p>
          </div>
          {/* <!-- Products section --> */}
          <div className="flex gap-2 flex-col">
            <h6 className="flex justify-center font-semibold uppercase md:justify-start">
              {t("LINKS.0.name")}
            </h6>
            <p className="">
              <a href="/profile/agreements" className="link hover:text-success">{t("LINKS.0.ITEMS.0")}</a>
            </p>
            <p className="">
              <a href="/privacy" className="link hover:text-success">{t("LINKS.0.ITEMS.1")}</a>
            </p>
          </div>
          {/* <!-- Useful links section --> */}
          <div className="flex gap-2 flex-col">
            <h6 className="flex justify-center font-semibold uppercase md:justify-start">
              {t("LINKS.1.name")}
            </h6>
            <p>
              <a href="/profile/dashboard" className="link hover:text-success">{t("LINKS.1.ITEMS.0")}</a>
            </p>
            <p>
              <a href="/browser" className="link hover:text-success">{t("LINKS.1.ITEMS.1")}</a>
            </p>
          </div>
          {/* <!-- Contact section --> */}
          <div className="flex gap-2 flex-col">
            <h6 className="flex justify-center font-semibold uppercase md:justify-start">
              {t("LINKS.2.name")}
            </h6>
            <p className="flex items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5 shrink-0"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <a
                href={revealMail ? "mailto:stefangrzelec@gmail.com" : ""}
                className="link hover:text-success"
                onMouseEnter={() => setRevealMail(true)}
                onMouseLeave={() => setRevealMail(false)}
              >
                {revealMail ? "stefangrzelec@gmail.com" : t("LINKS.2.ITEMS.0")}
              </a>
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaGithub size={20} className="mr-3" />
              <a href="https://github.com/Spoky03" className="link hover:text-success">
                {t("LINKS.2.ITEMS.1")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
