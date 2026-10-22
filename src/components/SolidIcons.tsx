export function ArrowRightSolid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.7 4.7C12.31 4.31 11.68 4.31 11.29 4.7C10.9 5.09 10.9 5.73 11.29 6.12L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"/>
    </svg>
  );
}

export function ArrowLeftSolid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11H7.83L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.71 11.29C4.32 11.68 4.32 12.31 4.71 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"/>
    </svg>
  );
}

export function ArrowDownRightSolid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5C19.45 5 19 5.45 19 6V16.59L6.12 3.71C5.73 3.32 5.09 3.32 4.71 3.71C4.32 4.1 4.32 4.73 4.71 5.12L17.59 18H7C6.45 18 6 18.45 6 19C6 19.55 6.45 20 7 20H20C20.55 20 21 19.55 21 19V6C21 5.45 20.55 5 20 5Z"/>
    </svg>
  );
}
