import { Button } from "./ui/button";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
}: {
  currentPage: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  totalPages: number;
  isLoading: boolean;
}) {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={currentPage === page ? "default" : "outline"}
            disabled={isLoading}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
