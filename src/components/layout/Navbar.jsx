import { Handbag, Heart, Search, User, List, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openLogin,
  closeAuth,
  openCart,
  closeCart,
  openSearch,
  closeSearch,
} from "../../store/slice/Uislice";
import AuthModal from "../auth/AuthModal";
import CartSidebar from "../cart/CartSidebar";
import SearchModal from "../searchModal";
import { BsFacebook, BsInstagram, BsTiktok, BsTwitter, BsYoutube } from "react-icons/bs";
import { getCmsSection } from "../../utils/cms";
import { formatPrice } from "../../utils/price";
import { useShipping } from "../../utils/shipping";
import logo from "../../assets/it-store-logo.svg";

const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "CATALOG", path: "/shops" },
  { name: "ABOUT", path: "/about" },
  { name: "SUPPORT", path: "/contact" },
];

const SOCIAL_ICONS = { instagram: BsInstagram, facebook: BsFacebook, twitter: BsTwitter, x: BsTwitter, tiktok: BsTiktok, youtube: BsYoutube };

// Product pages live under /shop/:slug, so they highlight SHOP too.
const isLinkActive = (link, pathname) =>
  pathname === link.path || (link.path === "/shops" && pathname.startsWith("/shop/"));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.ui.authModal);
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const isSearchOpen = useSelector((state) => state.ui.isSearchOpen);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) =>
    (state.cart?.items || []).reduce((sum, item) => sum + item.quantity, 0),
  );
  const wishlistCount = useSelector((state) => state.wishlist?.items?.length || 0);
  const pages = useSelector((state) => state.site.pages);
  const socials = (getCmsSection(pages, "global_footer", "socials")?.socials || [])
    .map((social) => ({ ...social, Icon: SOCIAL_ICONS[String(social.platform || "").toLowerCase()] }))
    .filter((social) => social.Icon && social.url);
  const shipping = useShipping(0);

  const closeCartDrawer = useCallback(() => dispatch(closeCart()), [dispatch]);
  const closeSearchModal = useCallback(() => dispatch(closeSearch()), [dispatch]);

  const handleAccount = () => {
    if (!isAuthenticated) {
      dispatch(openLogin());
      return;
    }
    navigate("/dashboard");
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const whiteNavbarPages = [
  "/checkout",
  "/cart",
  "/shop/:slug",
  "/wishlist",
  "/faq",
  "/shipping-returns",
  "/returns",
  "/orders",
  "/orders/:orderId",
  "/order-success/:orderId",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-settings",
];

const isWhiteNavbar = whiteNavbarPages.some((pattern) => {
  const regexStr = "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "(/.*)?$";
  return new RegExp(regexStr).test(location.pathname);
});

const navbarSolid = isWhiteNavbar || isScrolled || isMobileMenuOpen;
 useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const iconClass = (variant = "default") => {
    if (variant === "ghost") {
      return `cursor-pointer rounded-full p-2 backdrop-blur-lg transition-colors duration-200 ${
        navbarSolid
          ? "bg-black/10 text-black hover:bg-black/15"
          : "bg-white/15 text-white hover:bg-white/25"
      }`;
    }
    return `cursor-pointer rounded-full p-2 transition-colors duration-200 ${
      navbarSolid
      ? "bg-[#087cc4] text-white hover:bg-[#056aaa]"
        : "bg-white text-[#087cc4] hover:bg-white/90"
    }`;
  };

  return (
    <>
      <nav
  className={`page-x fixed top-0 left-0 z-50 w-full border-b py-3 transition-all duration-300 md:py-4 ${
    navbarSolid
      ? "border-[#dce7f2] bg-white/95 text-[#14213d] shadow-sm backdrop-blur-xl"
      : "border-transparent bg-white/80 text-[#14213d] backdrop-blur-xl"
  }`}
>
        <div className="page-inner flex items-center justify-between">
          <Link
            to="/"
            aria-label="IT Store home"
            className="relative h-11 w-[116px] shrink-0 overflow-hidden"
          >
            <img
              src={logo}
              alt="IT Store"
              className="absolute left-1/2 top-1/2 w-[122px] max-w-none -translate-x-1/2 -translate-y-1/2 transition"
            />
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-[#087cc4]/20 bg-[#087cc4] p-1 shadow-[0_8px_24px_-14px_rgba(8,124,196,.75)] lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link, location.pathname);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-medium text-[12px] uppercase tracking-[0.08em] no-underline transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#087cc4] shadow-sm"
                      : "text-white/85 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(openSearch())}
              className={iconClass("ghost")}
              aria-label="Open search"
            >
              <Search size={16} />
            </button>
            <Link
              to="/wishlist"
              className={`relative hidden sm:block ${iconClass("ghost")}`}
              aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} saved` : "Wishlist"}
            >
              <Heart size={16} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9a96e] px-1 text-[10px] font-semibold tabular-nums text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={handleAccount}
              className={iconClass()}
              aria-label={isAuthenticated ? "My account" : "Sign in"}
            >
              <User size={16} />
            </button>
            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className={`relative ${iconClass()}`}
              aria-label={cartCount > 0 ? `Open bag, ${cartCount} items` : "Open bag"}
            >
              <Handbag size={16} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9a96e] px-1 text-[10px] font-semibold tabular-nums text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`ml-1 cursor-pointer rounded-full p-2 transition-colors duration-200 lg:hidden ${
                "bg-[#eaf5fb] text-[#087cc4] hover:bg-[#d9eef9]"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/35 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#f8f8f8] shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
            <Link
              to="/"
              onClick={closeMobileMenu}
              aria-label="IT Store home"
              className="relative h-10 w-[108px] shrink-0 overflow-hidden"
            >
              <img
                src={logo}
                alt="IT Store"
                className="absolute left-1/2 top-1/2 w-[114px] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
            </Link>

            <button
              onClick={closeMobileMenu}
              className="rounded-full bg-black/5 p-2 text-black transition-colors hover:bg-black/10"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-black/40">
                Navigate
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {[...NAV_LINKS, { name: wishlistCount ? `WISHLIST (${wishlistCount})` : "WISHLIST", path: "/wishlist" }].map((link, i) => {
                const isActive = isLinkActive(link, location.pathname);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                    }}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-4 font-mono text-[13px] uppercase tracking-[0.12em] transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-3 opacity-0"
                    } ${
                      isActive
                        ? "border-[#c9a96e] bg-[#c9a96e]/10 text-black"
                        : "border-black/10 bg-white text-black/70 hover:border-black/20 hover:bg-white hover:text-black"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-[#c9a96e]"
                          : "bg-black/20 group-hover:bg-black/40"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-black px-5 py-5 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                Smarter tech
              </p>
              <p className="mt-3 text-[15px] leading-6 text-white/90">
                Everyday electronics, dependable accessories and thoughtful service in one place.
              </p>
              <Link
                to="/shops"
                onClick={closeMobileMenu}
                className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Browse catalog
              </Link>

              {socials.length > 0 && (
                <div className="mt-5 flex items-center gap-3">
                  {socials.map(({ platform, url, Icon }) => (
                    <a
                      key={`${platform}-${url}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                      aria-label={platform}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {shipping.hasThreshold && (
            <div className="border-t border-black/10 px-5 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
                Free shipping on orders over {formatPrice(shipping.threshold)}
              </p>
            </div>
          )}
        </div>
      </div>

      <AuthModal view={authModal} onClose={() => dispatch(closeAuth())} />
      <CartSidebar isOpen={isCartOpen} onClose={closeCartDrawer} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Navbar;
