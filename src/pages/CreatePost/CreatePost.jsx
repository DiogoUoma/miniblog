import style from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Pro favor, preencha todos os campos!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  }

  return (
    <div className={style.create_post}>
      <h1>Create Post</h1>
      <p>Escreva sobre o que quiser e compartilhe</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom titulo..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image}
          />
        </label>
        <label>
          <span>Conteudo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteudo do post"
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira uma tag separada por virgula"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde
          </button>
        )}
        {response.error && <p className="error">{error}</p>}
        {formError && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
