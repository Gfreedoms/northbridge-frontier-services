export default function NoOpenPositions() {
  return (
    <section className="section nb-careerspage-empty">
      <div className="container">
        <span className="nb-careerspage-empty-icon" aria-hidden="true">
          <i className="fa-solid fa-clipboard-list"></i>
        </span>
        <h2 className="section-heading">No Open Positions Right Now</h2>
        <p className="nb-careerspage-empty-body">
          We don&apos;t have any roles open at the moment. If that changes, this page is where we&apos;ll
          list them.
        </p>
      </div>
    </section>
  );
}
