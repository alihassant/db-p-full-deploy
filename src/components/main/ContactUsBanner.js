export default function ContactUsBanner() {
  return (
    <>
      {/* Start: Contact Us Banner */}
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5">
            <div className="pb-2 pb-lg-1">
              <h2 className="fw-bold text-warning mb-2">
                Not sure which plan suits you?
              </h2>
              <p className="mb-0">
                Contact us and we will help you choose the best plan for your
                needs.
              </p>
            </div>
            <div className="my-2">
              <a
                className="btn btn-light fs-5 py-2 px-4"
                role="button"
                href="contact"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* End: Contact Us Banner */}
    </>
  );
}
