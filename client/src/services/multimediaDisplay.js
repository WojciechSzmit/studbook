export const imageShow = (src, theme) => {
  return (
    <img
      //src={URL.createObjectURL(img)}
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      //src={URL.createObjectURL(img)}
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};

export const pdfShow = (src, theme) => {
  return (
    <object
      data={src}
      type="application/pdf"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <p>
        Przepraszamy, ale Twoja przeglądarka nie obsługuje wyświetlania plików
        PDF.
      </p>
    </object>
  );
};
