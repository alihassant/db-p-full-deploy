export default function DashboardLayout({ children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
      />
      <div>
        <div>{children}</div>
      </div>
    </>
  );
}
