
import Image from "next/image";

interface UserCardProps {
    src: string;
    alt: string;
    label: string | null;

  }

const MemberInfo = ({ src, alt, label }: UserCardProps) => (
    <div className="flex items-center gap-2">
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
        className="object-contain"
      />
      <p className="text-small-regular text-light-2">{label}</p>
    </div>
  );

export default  MemberInfo;