import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no Frtont-end e
        Firebase no back-end
      </p>
    </div>
  );
};

export default About;
