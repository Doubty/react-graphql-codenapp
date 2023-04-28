import React, { useState } from "react";
import { useCharactersQuery } from "./generated-types";

export default () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>("");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useCharactersQuery({
    variables: {
      filter: {
        name: search,
        status: status,
      },
      page: page,
    },
  });

  const list = data?.characters?.results || [];
  const isFirst = page === 1;
  const isLast = page >= (data?.characters?.info?.pages ?? 0);

  return (
    <div>
      <form className="form-section">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name here"
        />
        <select
          onChange={(e) => {
            setStatus(e.target.value === "Any" ? undefined : e.target.value);
          }}
        >
          <option value="Any">Unknown</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
        </select>
      </form>

      <div className="container-pagination">
        {!isFirst && (
          <button className="button" onClick={() => setPage((old) => old - 1)}>
            PREV
          </button>
        )}
        {page}
        {!isLast && (
          <button className="button" onClick={() => setPage((old) => old + 1)}>
            NEXT
          </button>
        )}
      </div>

      <section className="section-info">
        <div className="container-cards">
          {list.map((post) => (
            <article key={post?.id ?? undefined} className="character-card">
              <div className="card-character-image">
                <img src={post?.image + ""} alt="Body Guard Morty" />
              </div>
              <div className="card-character-info">
                <div className="section-info-1">
                  <h2 className="white-text-hover"> {post?.name}</h2>
                  <span className="status">
                    <span className={`status__icon ${post?.status}`}></span>
                    {post?.status} - {post?.species}
                  </span>
                </div>
                <div className="section-info-2">
                  <span className="text-gray">Last known location:</span>
                  <span className="white-text-hover">
                    {post?.location?.name}
                  </span>
                </div>
                <div className="section-info-3">
                  <span className="text-gray">First seen in:</span>
                  <span className="white-text-hover">
                    {post?.episode.at(0)?.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {loading && <h1>Carregando...</h1>}
      {error && <h1>Alguma coisa aconteceu...</h1>}
    </div>
  );
};
