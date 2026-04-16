interface PortfolioPaginationProps {
  page: number;
  totalPages: number;
  onGoToPage: (page: number, dir: number) => void;
}

const PortfolioPagination = ({ page, totalPages, onGoToPage }: PortfolioPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGoToPage(i, i > page ? 1 : -1)}
          aria-label={`Ir para página ${i + 1}`}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === page
              ? "w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
          }`}
        />
      ))}
      <span className="ml-4 text-xs text-muted-foreground">
        {page + 1} / {totalPages}
      </span>
    </div>
  );
};

export default PortfolioPagination;
