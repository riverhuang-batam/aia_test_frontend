function View(props) {
  const { datas, currentPage } = props;
  return (
    <>
      {datas.items && (
        <img
          src={datas.items[currentPage - 1]?.media.m}
          alt={datas.items[currentPage - 1]?.media.m}
          className="mt-4"
        />
      )}
      <h3>Title: {datas.items && datas.items[currentPage - 1]?.title}</h3>
      <p>Tag: {datas.items && datas.items[currentPage - 1]?.tags}</p>
    </>
  );
}

export default View;
