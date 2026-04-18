interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="bg-eco-light">
    <div className="relative bg-gradient-to-br from-eco-dark via-eco-primary to-eco-medium text-white">

      {/* Content */}
      <div className="relative z-10 pt-16 pb-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-green-100/80 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* White wave */}
      <div className="absolute bottom-[-1px] left-0 right-0">
        <svg
          viewBox="0 0 1440 72"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,48 C240,80 480,16 720,32 C960,48 1200,72 1440,40 L1440,72 L0,72 Z"
            fill="currentColor"
            className="text-eco-light"
          />
        </svg>
      </div>
    </div>
    <div className="h-16" />
    </div>
  );
}
