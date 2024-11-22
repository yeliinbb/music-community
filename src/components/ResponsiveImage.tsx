import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ResponsiveImage = ({ src, alt, className = '' }: ResponsiveImageProps) => {
  return (
    <div className="relative w-full h-full">
      <Image src={src} alt={alt} fill className={`object-contain ${className}`} sizes="100%" />
    </div>
  );
};

export default ResponsiveImage;
