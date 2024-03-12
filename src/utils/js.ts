export const closeDaisyUIDropdown = () => {
  const elem = document.activeElement as HTMLElement;
  if (elem) {
    elem?.blur();
  }
};
