interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="bg-eco-light">
      <div className="relative overflow-hidden bg-gradient-to-br from-eco-dark via-eco-primary to-eco-medium text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)]" />

        {/* Content */}
        <div className="relative z-10 pt-10 pb-12 sm:pt-12 sm:pb-14 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-green-100/80 sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* White wave */}
        <div className="absolute bottom-[-1px] left-0 right-0">
          <svg
            viewBox="0 0 1440 72"
            className="block w-full"
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
      <div className="h-6 sm:h-8" />
    </div>
  );
}
