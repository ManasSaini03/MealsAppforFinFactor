export default function CategoryCard({ category, onClick }) {
    return (
      <button
        onClick={() => onClick(category.strCategory)}
        className="min-w-[140px] sm:min-w-0
                   bg-gradient-to-br from-[#BBC863] to-[#658C58]
                   text-[#31694E] font-bold
                   rounded-2xl px-4 py-6
                   shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                   transform hover:-translate-y-1 hover:rotate-[0.4deg]
                   active:translate-y-1 transition-all
                   backdrop-blur"
      >
        {category.strCategory}
      </button>
    );
  }
  