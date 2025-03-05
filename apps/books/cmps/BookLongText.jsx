const { useState, useEffect } = React;

export function LongTxt({ txt, length = 100 }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      {isOpen ? (
        <React.Fragment>
          <p>{txt}</p>
          <button onClick={() => setIsOpen(false)}>Read Less</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>{txt.substring(0, length)}...</p>
          <button onClick={() => setIsOpen(true)}>Read More</button>
        </React.Fragment>
      )}
    </section>
  );
}
