import Link from "next/link";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";

const NotFound = () => {
  return (
    <BoothPage>
      <BoothHeader command="cd ./somewhere" title="No such booth">
        <p>
          <span className="text-accent">cd: no such file or directory.</span>{" "}
          The page you followed doesn&apos;t exist, or it moved when the site
          became a playground.
        </p>
      </BoothHeader>
      <Link
        href="/"
        data-nav-sound
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-[18px] py-[11px] font-mono text-[13px] font-semibold text-ink"
      >
        cd ~
      </Link>
    </BoothPage>
  );
};

export default NotFound;
