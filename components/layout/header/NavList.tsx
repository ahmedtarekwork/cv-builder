// components
// shadcn
import { Button } from "@/components/ui/button";

const items = [
  {
    content: "Home",
    href: "#home",
    id: 1,
  },
  {
    content: "Features",
    href: "#features",
    id: 2,
  },
  {
    content: "Templates",
    href: "#templates",
    id: 3,
  },
  {
    content: "suggest a new feature",
    href: "#suggest-feature",
    id: 4,
  },
];

const NavList = () => {
  return (
    <nav>
      <ul
        id="nav-list"
        className="transition duration-300 ease-in-out origin-top max-lg:scale-50 max-lg:opacity-0 max-lg:p-4 max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:flex-col flex items-center gap-2"
      >
        {items.map(({ content, href, id }) => (
          <li key={id} className="max-lg:w-full">
            <Button
              asChild
              className="max-lg:w-full"
              onClick={(e) =>
                e.currentTarget.parentElement?.parentElement?.classList.remove(
                  "active"
                )
              }
            >
              <a href={href}>{content}</a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavList;
