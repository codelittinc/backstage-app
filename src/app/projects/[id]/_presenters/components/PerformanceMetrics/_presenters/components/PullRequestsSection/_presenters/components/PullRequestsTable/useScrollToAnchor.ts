const useScrollToAnchor = (offset: number = 70) => {
  return (targetAnchor: string) => {
    if (!(typeof window === "undefined")) {
      console.log("potato");
      const hash = targetAnchor;

      const startWithHashRegex = /^#\w+/g;
      const targetElement = document?.querySelector(`${hash}`);

      if (!startWithHashRegex.test(hash) || !targetElement) {
        return;
      }

      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      const scroll = () => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      };

      requestAnimationFrame(scroll);
    }
  };
};

export default useScrollToAnchor;
