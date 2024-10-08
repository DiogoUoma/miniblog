import React from "react";
import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocumet } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  //const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null);

  const { deleteDocument } = useDeleteDocumet("posts");

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <h2>Gerencie os seus Posts</h2>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <Link
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </Link>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
